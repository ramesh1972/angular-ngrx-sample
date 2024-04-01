import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CoursesPrettyListComponent } from './courses-pretty-list/courses-pretty-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import {CoursesListComponent} from './courses-list/courses-list.component';

const routes: Routes = [
  { path: '', component: AddCourseComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'courses-pretty', component: CoursesPrettyListComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
