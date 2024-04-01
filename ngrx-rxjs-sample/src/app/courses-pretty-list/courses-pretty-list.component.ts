import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseItem } from '../store/models/courseItem.model';
import { Courses } from '../store/models/courses.model';
import { Department } from '../store/models/department.model';
import { invokeCourseItemsAPI } from '../store/actions/course.action';
import { selectCourses } from '../store/selectors/courses.selector';
import { select } from '@ngrx/store';
import { Appstate } from '../store/shared/appstate';

@Component({
  selector: 'app-courses-pretty-list',
  templateUrl: './courses-pretty-list.component.html',
  styleUrls: ['./courses-pretty-list.component.css']
})

export class CoursesPrettyListComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>) {}
  courseItems$ = this.store.pipe(select(selectCourses));
  departments: Department[] = [];
  
  ngOnInit(): void {
    //this.store.dispatch(invokeCourseItemsAPI());

    this.courseItems$.subscribe({
      next: (courseItems) => {
        this.groupByDepartment(courseItems);
      },
      error: err => console.error(err),
      // complete callback can be added here if needed
    });
  }

  groupByDepartment(courseItems: any) {
    this.departments = new Array<Department>();
    courseItems.reduce((acc, courseItem) => {
      const key = courseItem.department;

      let deptObject = null;
      for (let i = 0; i < this.departments.length; i++) {
        var dept = this.departments[i];
        if (dept.department === key) {
          deptObject = dept;
          break;
        }
      }

      if (deptObject === null) {
        deptObject = new Department();
        deptObject.department = key;
        deptObject.deptCourses = new Array<CourseItem>();
        this.departments.push(deptObject);
      }
      deptObject.deptCourses.push(courseItem);
    }, {});
  }
}
