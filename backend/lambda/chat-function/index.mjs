import {BedrockRuntimeClient, InvokeModelCommand} from "@aws-sdk/client-bedrock-runtime";
import https from 'https';
import {TextDecoder} from 'util';
// import { Client } from '@opensearch-project/opensearch'

// const openSearchEndpoint = 'search-tim-rag-e7b7rsawwi7pds2zpd45huznem.us-east-2.es.amazonaws.com';
const client = new BedrockRuntimeClient({ region: "us-east-2" });
// const openSearchClient = new Client({
//   node: 'https://search-tim-rag-e7b7rsawwi7pds2zpd45huznem.us-east-2.es.amazonaws.com/',
//   auth: {
//     username: 'query-opensearch',
//     password: '3jLzfG@Q50%iL9Fi'
//   }
// })

export async function handler(event) {
  console.log("Event received:", JSON.stringify(event));
if (event.headers.authorization !== "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c") {
  return {
    statusCode: 401,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ error: "Unauthorized" }),
  };

}

  // ✅ Parse the user message from the request body

  const body = JSON.parse(event.body);
  const userInput = body.message;

  try {
    const vectorizedQuery = await client.send(
      new InvokeModelCommand({
        modelId: "amazon.titan-embed-text-v2:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          inputText: userInput, // Directly assign userInput to inputText
        }),
      })
    );
    const decodedBody = new TextDecoder().decode(vectorizedQuery.body);
    const embeddingResult = JSON.parse(decodedBody);
    const queryEmbeddings = embeddingResult.embedding;
    console.log("Vector dimensions:", queryEmbeddings.length);

    const searchResults = await searchVector(queryEmbeddings);
    const searchResultsString = JSON.stringify(searchResults.hits[0]._source.logMessage);
    console.log("First Search results:", searchResultsString);

    const response = await client.send(
      new InvokeModelCommand({
        modelId: "us.amazon.nova-micro-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({ messages: [
          {
            role: "user",
            content: [
              { text: userInput }
            ]
          }
        ]}),
      })
    );

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({ reply: responseBody }),
    };
  } catch (error) {
    console.error("Error in Lambda:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

async function searchVector(queryVector) {
  const data = JSON.stringify({
    size: 5,
    query: {
      knn: {
        embedding: {
          vector: queryVector,
          k: 5,
        },
      },
    },
  });

  const options = {
    hostname: 'search-tim-rag-e7b7rsawwi7pds2zpd45huznem.us-east-2.es.amazonaws.com',
    port: 443,
    path: '/logs-vector-index/_search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      // Include authorization headers if required
      'Authorization': 'Basic ' + Buffer.from('query-opensearch:3jLzfG@Q50%iL9Fi').toString('base64'),
    },
  };

  console.log("Options:", options);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          console.log("Parsed response:", parsed);
          resolve(parsed.hits);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Error during OpenSearch request:', e);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}
