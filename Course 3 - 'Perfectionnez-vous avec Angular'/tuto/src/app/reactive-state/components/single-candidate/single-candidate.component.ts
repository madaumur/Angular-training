import { ActivatedRoute, Params, Router } from '@angular/router'
import { CandidateService } from './../../services/candidate.service'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable, switchMap, take, tap } from 'rxjs'
import { Candidate } from '../../models/candidate.model'

@Component({
	selector: 'app-single-candidate',
	templateUrl: './single-candidate.component.html',
	styleUrls: ['./single-candidate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
	loading$!: Observable<boolean>
	candidate$!: Observable<Candidate>

	constructor(
		private candidateService: CandidateService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initObsevable()
	}

	private initObsevable(): void {
		this.loading$ = this.candidateService.loading$
		this.candidate$ = this.route.params.pipe(
			switchMap(
				(params: Params): Observable<Candidate> =>
					this.candidateService.getCandidateById(+params['id'])
			)
		)
	}

	onHire(): void {
		this.candidate$
			.pipe(
				take(1),
				tap((candidates) => {
					this.candidateService.hireCandidate(candidates.id)
					this.onGoBack()
				})
			)
			.subscribe()
	}

	onRefuse(): void {
		this.candidate$
			.pipe(
				take(1),
				tap((candidates) => {
					this.candidateService.refuseCandidate(candidates.id)
					this.onGoBack()
				})
			)
			.subscribe()
	}

	onGoBack() {
		this.router.navigateByUrl('/reactive-state/candidates')
	}
}
