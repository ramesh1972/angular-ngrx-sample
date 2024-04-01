import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';

import { Appstate } from './store/shared/appstate';
import { setAPIStatus } from './store/shared/app.action';

import { invokeCourseItemsAPI } from './store/actions/course.action';
import { selectCourses } from './store/selectors/courses.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) { }
  courseItems$ = this.store.pipe(select(selectCourses));

  ngOnInit(): void {
    this.appStore.dispatch(
      setAPIStatus({
        apiStatus: { apiResponseMessage: 'Let us build the courses', apiStatus: 'success' },
      })
    );

    this.store.dispatch(invokeCourseItemsAPI());
  }
}

