import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { GraphComponent } from './components/graph/graph.component';


const routes: Routes = [
  {
    path: 'core',
    component: CoreComponent
  },
  {
    path: '',
    component: GraphComponent
  },
  {
    path: 'graph',
    component: GraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
