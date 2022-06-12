import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { ListModelComponent } from './list-model/list-model.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'', redirectTo:'/allbrand', pathMatch:'full'},
  {path:'allbrand', component:ListBrandComponent},
  {path:'allmodel', component:ListModelComponent},
  {path:'search', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
