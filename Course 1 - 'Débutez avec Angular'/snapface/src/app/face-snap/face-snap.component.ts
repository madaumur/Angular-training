import { Router } from '@angular/router';
import { FaceSnapsService } from './../services/face-snaps.service';
import { FaceSnap } from './../models/face-snap.model';
import { Component, OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-face-snap',
	templateUrl: './face-snap.component.html',
	styleUrls: ['./face-snap.component.scss']
})

export class FaceSnapComponent implements OnInit {

	@Input() faceSnap!: FaceSnap;

	buttonText!: string;

	constructor( private FaceSnapsService: FaceSnapsService, private router: Router) {}

	ngOnInit(): void {
		this.buttonText = 'Like !';
	}

	onViewFaceSnap() {
		this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
	}
}
