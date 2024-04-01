import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { setAPIStatus } from '../shared/app.action';

import { CourseItem } from '../models/courseItem.model';
import { CourseItemService } from '../../services/courses.service';
import { invokeCourseItemsAPI, coursesFetchAPISuccess, invokeSaveNewCourseItemAPI, saveNewCourseItemAPISucess } from '../actions/course.action';

import { selectCourses } from '../selectors/courses.selector';

@Injectable()
export class CourseItemEffect {
  constructor(
    private actions$: Actions,
    private coursesService: CourseItemService,
    private store: Store,
    private appStore: Store<CourseItem[]>
  ) { }

  loadAllCourseItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeCourseItemsAPI),
      withLatestFrom(this.store.pipe(select(selectCourses))),
      mergeMap(([, courseformStore]) => {
        return this.coursesService
          .get()
          .pipe(map((data) => coursesFetchAPISuccess({ allCourseItems: data })));
      })
    )
  );

  saveNewCourseItem$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(invokeSaveNewCourseItemAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: 'Creating Course', apiStatus: 'pending' } })
        );

        return this.coursesService.create(action.newCourse).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: 'Course has been Created', apiStatus: 'success' },
              })
            );

            return saveNewCourseItemAPISucess({ newCourse: data as CourseItem });
          })
        );
      })
    );
  }
  );
}