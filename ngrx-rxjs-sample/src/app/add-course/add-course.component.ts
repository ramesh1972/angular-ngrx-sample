import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { select } from '@ngrx/store';
import { Appstate } from '../store/shared/appstate';

import { CourseItem } from '../store/models/courseItem.model';
import { invokeSaveNewCourseItemAPI } from '../store/actions/course.action';
import { setAPIStatus } from '../store/shared/app.action';
import { selectAppState } from '../store/shared/app.selector';

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
    this.saveStatus$.subscribe((status) => {
      this.addCourseStatus = status.apiResponseMessage;
    });
  }

  changeStatus() {
    this.appStore.dispatch(
      setAPIStatus({ apiStatus: { apiResponseMessage: 'Enter Course Details & Click on Submit', apiStatus: '' } })
    );
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
