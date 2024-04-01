import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Courses } from '../store/models/courses.model';
import { invokeCourseItemsAPI } from '../store/actions/course.action';
import { selectCourses } from '../store/selectors/courses.selector';
import { select } from '@ngrx/store';
import { Appstate } from '../store/shared/appstate';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}
  courseItems$ = this.store.pipe(select(selectCourses));


  ngOnInit(): void {
    //this.store.dispatch(invokeCourseItemsAPI());

  }
}
