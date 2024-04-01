import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseItem } from './store/models/courseItem.model';
import { Courses } from './store/models/courses.model';
import { NgForm } from '@angular/forms';
import { invokeSaveNewCourseItemAPI, invokeCourseItemsAPI } from './store/actions/course.action';
import { selectCourses } from './store/selectors/courses.selector';
import { select } from '@ngrx/store';
import { setAPIStatus } from './store/shared/app.action';
import { selectAppState } from './store/shared/app.selector';
import { Appstate } from './store/shared/appstate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) { }
  courseItems$ = this.store.pipe(select(selectCourses));

  ngOnInit(): void {

    this.store.dispatch(invokeCourseItemsAPI());
  }

  /* addCourse(form: NgForm) {
    const courseItem: CourseItem = {
      name: form.value.name,
      department: form.value.department
    };

    this.store.dispatch(invokeSaveNewCourseItemAPI({newCourse: courseItem}));
    form.reset();

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
apiStatus$.subscribe((apState) => {
  if (apState.apiStatus == 'success') {
    this.appStore.dispatch(
      setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
    );
  }
});
  } */
}

