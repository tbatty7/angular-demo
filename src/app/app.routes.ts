import {Routes} from '@angular/router';
import {AiPageComponent} from "./ai-page/ai-page.component";

export const routes: Routes = [
  {path: 'ai-page', component: AiPageComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
];
