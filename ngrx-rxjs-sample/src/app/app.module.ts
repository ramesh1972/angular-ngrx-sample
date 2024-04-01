import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { courseReducer } from './store/reducers/course.reducer';
import { CourseItemEffect } from './store/effects/coures.effect';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {CoursesPrettyListComponent} from './courses-pretty-list/courses-pretty-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appReducer } from './store/shared/app.reducer';

@NgModule({
  declarations: [AppComponent, CoursesListComponent, CoursesPrettyListComponent, AddCourseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature("appState", appReducer ),
    StoreModule.forFeature('myCourses', courseReducer),
    EffectsModule.forFeature([CourseItemEffect]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]), // Replace '{}' with '[]'

  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
