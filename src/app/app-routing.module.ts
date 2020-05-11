import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';


const routes: Routes = [
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: '', redirectTo: '/add-workout', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
