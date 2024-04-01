import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { appReducer } from './store/shared/app.reducer';
import { courseReducer } from './store/reducers/course.reducer';
import { CourseItemEffect } from './store/effects/coures.effect';

import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AddCourseComponent } from './add-course/add-course.component';

@NgModule({
  declarations: [AppComponent, CoursesListComponent, DepartmentsComponent, AddCourseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature("appState", appReducer),
    StoreModule.forFeature('myCourses', courseReducer),
    EffectsModule.forFeature([CourseItemEffect]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
