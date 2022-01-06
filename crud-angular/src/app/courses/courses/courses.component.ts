import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService,
    private dialog: MatDialog) {
    this.courses$ = this.coursesService.list().
      pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos.');
          return of([])
        }
        )
      );
  }

  onError(ErrorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: ErrorMsg
    });
  }

  ngOnInit(): void {
  }

}
