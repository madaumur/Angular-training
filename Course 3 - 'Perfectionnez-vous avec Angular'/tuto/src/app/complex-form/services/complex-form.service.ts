import { Observable, mapTo, delay, catchError, of, map } from 'rxjs';
import { ComplexFormValue } from './../models/complex-form-value.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class ComplexFormService {

	constructor(private http : HttpClient){}

	saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
		return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
			//mapTo(true),
			map((): true => true),
			delay(1000),
			catchError((): Observable<boolean> => of(false).pipe(
				delay(1000)
			))
			);
		}
}