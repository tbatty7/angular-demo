import {Routes} from '@angular/router';
import {AiPageComponent} from "./ai-page/ai-page.component";
import {ParentComponent} from "./parent/parent.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: 'ai-page', component: AiPageComponent},
  {path: 'parent-page', component: ParentComponent},
  {path: '', component: AppComponent}
];
