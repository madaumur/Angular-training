import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
	selector: 'app-single-face-snap',
	templateUrl: './single-face-snap.component.html',
	styleUrls: ['./single-face-snap.component.scss']
})

export class SingleFaceSnapComponent {

	// VARIABLES
	faceSnap$!: Observable<FaceSnap>;

	buttonText!: string;


	// CONSTRUCTOR
	constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}


	// METHODES
	ngOnInit(): void {

		const snapId :number = +this.route.snapshot.params['id'];

		this.buttonText = 'Like !';
		this.faceSnap$ = this.faceSnapsService.getFaceSnapById(snapId);

	}

	onSnap(faceSnapId: number) {

		if (this.buttonText === 'Like !') {

			this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
				tap(() => {
					this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
					this.buttonText = 'Unlike ..';
				})
			).subscribe();

		} else {

			this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
				tap(() => {
					this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
					this.buttonText = 'Like !';
				})
			).subscribe();

		}

	}

}
