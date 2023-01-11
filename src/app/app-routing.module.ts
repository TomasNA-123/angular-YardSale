import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

import { CustomPreloadService } from './services/custom-preload.service';

import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

/*
{
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
*/

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./website/website.module").then(m => m.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: "cms",
    loadChildren: () => import("./cms/cms.module").then(m => m.CmsModule),
    canActivate: [AdminGuard]
  },

  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
