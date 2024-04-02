import { createAction, props } from '@ngrx/store';
import { CourseItem } from '../models/courseItem.model';

// fetch courses
export const invokeCourseItemsAPI = createAction(
  '[CourseItem API] Invoke CourseItems Fetch API'
);

export const coursesFetchAPISuccess = createAction(
  '[CourseItem API] Fetch API Success',
  props<{ allCourseItems: CourseItem[] }>()
);




// new course
export const invokeSaveNewCourseItemAPI = createAction(
  '[CourseItem API] Inovke save new course api',  
  props<{ newCourse: CourseItem }>()
);

export const saveNewCourseItemAPISucess = createAction(
  '[Books API] save new course api success',
  props<{ newCourse: CourseItem }>()
);
