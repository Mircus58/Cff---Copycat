import { Routes } from '@angular/router';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { ResultPageComponent } from './containers/result-page/result-page.component';

export const routes: Routes = [
    {path: "search", component: SearchPageComponent},
    {path: "result", component: ResultPageComponent},
    {path: "", redirectTo: "search", pathMatch: "full"}
];
