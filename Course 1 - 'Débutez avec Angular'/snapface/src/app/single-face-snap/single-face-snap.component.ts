import { FaceSnapsService } from './../services/face-snaps.service';
import { FaceSnap } from './../models/face-snap.model';
import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent {

	faceSnap!: FaceSnap;
	buttonText!: string;

	constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		const snapId :number = +this.route.snapshot.params['id'];

		this.buttonText = 'Like !';
		this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
	}

	onSnap(): void {
		if (this.buttonText === 'Like !') {
			this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
			this.buttonText = 'Unlike ..';
		} else {
			this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
			this.buttonText = 'Like !'
		}
	}

}
