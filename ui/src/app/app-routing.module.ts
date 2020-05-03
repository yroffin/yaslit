import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { GraphComponent } from './components/graph/graph.component';
import { ProjectComponent } from './components/project/project.component';


const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'core',
    component: CoreComponent
  },
  {
    path: '',
    component: ProjectComponent
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
