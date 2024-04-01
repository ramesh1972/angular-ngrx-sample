import { TestBed, async } from '@angular/core/testing';
import { CoursesPrettyListComponent } from './courses-pretty-list.component';

describe('CoursesPrettyListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent
      ],
    }).compileComponents();
  }));
});
