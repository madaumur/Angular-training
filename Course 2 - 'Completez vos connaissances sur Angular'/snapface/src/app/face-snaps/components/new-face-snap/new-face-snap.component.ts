import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
	selector: 'app-new-face-snap',
	templateUrl: './new-face-snap.component.html',
	styleUrls: ['./new-face-snap.component.scss']
})

export class NewFaceSnapComponent implements OnInit {

	// VARIABLES
	snapForm!: FormGroup;
	faceSnapPreview$!: Observable<FaceSnap>;
	urlRegex!: RegExp;


	// CONSTRUCTOR
	constructor(private formBuilder: FormBuilder,
		private faceSnapsService: FaceSnapsService,
		private router: Router) {}


	// METHODES
	ngOnInit(): void {
		this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

		this.snapForm = this.formBuilder.group({
			title: [null, [Validators.required]],
			description: [null, [Validators.required]],
			imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
			location: [null]
		}, {
			updateOn: 'blur'
		});

		this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
			map(formValue => ({
				...formValue,
				createdDate: new Date(),
				snaps: 0,
				id: 0
			}))
		);
	}

	onSubmitForm(): void {
		this.faceSnapsService.addFaceSnap(this.snapForm.value).pipe(
			tap((): Promise<Boolean> => this.router.navigateByUrl('/facesnaps'))
		).subscribe();
	}
}
