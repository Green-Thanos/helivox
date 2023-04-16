import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatalogsPageComponent } from "./catalogs-page/catalogs-page.component";
import { ArticlesPageComponent } from "./articles-page/articles-page.component";
import { AboutUsPageComponent } from "./about-us-page/about-us-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainPageComponent } from "./main-page/main-page.component";

const appRoutes: Routes = [
    {
        path: '', component: MainPageComponent, pathMatch: 'full'
    },
    {
        path: 'catalogs', component: CatalogsPageComponent
    },
    {
        path: 'articles', component: ArticlesPageComponent
    },
    {
        path: 'about-us', component: AboutUsPageComponent
    },
    {
        path: 'login', component: LoginPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}