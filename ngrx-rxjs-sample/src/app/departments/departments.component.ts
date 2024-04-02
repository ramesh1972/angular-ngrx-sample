import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';

import { Appstate } from '../store/shared/appstate';

import { CourseItem } from '../store/models/courseItem.model';
import { Department } from '../store/models/department.model';
import { selectCourses } from '../store/selectors/courses.selector';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  courseItems$ = this.store.pipe(select(selectCourses));
  _departments: Department[] = [];
  
  ngOnInit(): void {
    this.courseItems$.subscribe({
      next: (courseItems) => {
        this.groupByDepartment(courseItems);
      },
      error: err => console.error(err),

    });
  }

  groupByDepartment(courseItems: any) {
    this._departments = new Array<Department>();

    courseItems.reduce((acc, courseItem) => {
      const key = courseItem.department;

      let deptObject = null;
      for (let i = 0; i < this._departments.length; i++) {
        var dept = this._departments[i];
        if (dept.department === key) {
          deptObject = dept;
          break;
        }
      }

      if (deptObject === null) {
        deptObject = new Department();
        deptObject.department = key;
        deptObject.deptCourses = new Array<CourseItem>();
        this._departments.push(deptObject);
      }

      deptObject.deptCourses.push(courseItem);
    }, {});
  }
}
