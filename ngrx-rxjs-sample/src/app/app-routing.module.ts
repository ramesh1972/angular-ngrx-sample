import { RouterModule, Routes } from '@angular/router';

import { DepartmentsComponent } from './departments/departments.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  { path: '', component: AddCourseComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'departments', component: DepartmentsComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
