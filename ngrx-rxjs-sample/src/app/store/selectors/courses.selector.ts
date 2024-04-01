import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseItem } from '../models/courseItem.model';

export const selectCourses = createFeatureSelector<CourseItem[]>('myCourses');

export const selectCourseById = (courseId: number) =>
  createSelector(selectCourses, (courses: CourseItem[]) => {
    var coursebyId = courses.filter((_) => _.id === String(courseId));
    if (coursebyId.length === 0) {
      return null;
    }
    return coursebyId[0];
  });
