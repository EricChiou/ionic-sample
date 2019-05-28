import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'nextpage',
    loadChildren: './tab1/nextpage/nextpage.module#NextpagePageModule'
  },
  {
    path: 'uipage',
    loadChildren: './tab1/uipage/uipage.module#UIpagePageModule'
  },
  {
    path: 'modalpage',
    loadChildren: './tab1/modalpage/modalpage.module#ModalpagePageModule'
  },
  {
    path: 'slidespage',
    loadChildren: './tab1/slidespage/slidespage.module#SlidespagePageModule'
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
