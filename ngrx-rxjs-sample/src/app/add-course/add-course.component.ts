import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseItem } from '../store/models/courseItem.model';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { invokeSaveNewCourseItemAPI, invokeCourseItemsAPI } from '../store/actions/course.action';
import { setAPIStatus } from '../store/shared/app.action';
import { selectAppState } from '../store/shared/app.selector';
import { select } from '@ngrx/store';
import { Courses } from '../store/models/courses.model';
import { selectCourses } from '../store/selectors/courses.selector';
import { Appstate } from '../store/shared/appstate';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) { }
  
  saveStatus$ = this.appStore.pipe(select(selectAppState));  
  addCourseStatus = '';

  ngOnInit(): void {
    //this.store.dispatch(invokeCourseItemsAPI());

    this.saveStatus$.subscribe((status) => {
      this.addCourseStatus = status.apiResponseMessage;
    });

    this.appStore.dispatch(
      setAPIStatus({ apiStatus: { apiResponseMessage: 'Click on Submit', apiStatus: '' } })
    );
        console.log('appState in add-course:', this.saveStatus$);
  }

  addCourse(form: NgForm) {
    const courseItem: CourseItem = {
      name: form.value.name,
      department: form.value.department
    };

    console.log('Course Item:', courseItem);
    this.store.dispatch(invokeSaveNewCourseItemAPI({ newCourse: courseItem }));
    form.reset();

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: 'Created Course Successfully', apiStatus: '' } })
        );
      }
    });
  }
}
