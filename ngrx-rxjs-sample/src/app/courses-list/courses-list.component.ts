import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Appstate } from '../store/shared/appstate';

import { selectCourses } from '../store/selectors/courses.selector';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) { }

  courseItems$ = this.store.pipe(select(selectCourses));

  ngOnInit(): void {
  }
}
