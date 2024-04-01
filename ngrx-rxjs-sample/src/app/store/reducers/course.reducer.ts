// // import the interface
import { createReducer, on } from '@ngrx/store';

import { CourseItem } from '../models/courseItem.model';
import { coursesFetchAPISuccess, saveNewCourseItemAPISucess } from '../actions/course.action';

//create a dummy initial state
export const initialState: ReadonlyArray<CourseItem> = [];

export const courseReducer = createReducer(
  initialState,
  on(coursesFetchAPISuccess, (state, { allCourseItems }) => {
    return allCourseItems;
  }),

  on(saveNewCourseItemAPISucess, (state, { newCourse }) => {
    let newState = [...state];
    newState.unshift(newCourse);
    return newState;
  })
);