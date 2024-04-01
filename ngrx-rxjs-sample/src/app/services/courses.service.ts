import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseItem } from '../store/models/courseItem.model';

@Injectable({ providedIn: 'root' })
export class CourseItemService {
  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<CourseItem[]>('http://localhost:5010/courses/');
  }

  create(payload: CourseItem) {
    return this.http.post<CourseItem>('http://localhost:5010/courses/', payload);
  }

  update(payload: CourseItem) {
    return this.http.put<CourseItem>(
      `http://localhost:5010/courses/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:5010/courses/${id}`);
  }
}
