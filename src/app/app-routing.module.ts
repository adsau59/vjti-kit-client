import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReportComponent } from './report/report.component';
import { GradeCalcComponent } from './grade-calc/grade-calc.component';

/**
 * Routes to different components
 */
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'grade-calc',
    component: GradeCalcComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
