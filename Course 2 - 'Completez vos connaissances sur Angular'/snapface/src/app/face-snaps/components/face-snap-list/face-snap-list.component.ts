import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';


@Component({
	selector: 'app-face-snap-list',
	templateUrl: './face-snap-list.component.html',
	styleUrls: ['./face-snap-list.component.scss']
})

export class FaceSnapListComponent {

	faceSnaps$!: Observable<FaceSnap[]>

	constructor(private faceSnapsService: FaceSnapsService) { }

	ngOnInit(): void {
		this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
	}
}
