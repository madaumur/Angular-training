import { CandidateSearchType } from './../../enums/candidate-search-type.enum'
import { CandidateService } from './../../services/candidate.service'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable, startWith, map, combineLatest } from 'rxjs'
import { Candidate } from '../../models/candidate.model'
import { FormBuilder, FormControl } from '@angular/forms'

@Component({
	selector: 'app-candidate-list',
	templateUrl: './candidate-list.component.html',
	styleUrls: ['./candidate-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateListComponent implements OnInit {
	loading$!: Observable<boolean>
	candidates$!: Observable<Candidate[]>

	searchCtrl!: FormControl
	searchTypeCtrl!: FormControl
	searchTypeOptions!: {
		value: CandidateSearchType
		label: string
	}[]

	constructor(
		private candidateService: CandidateService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.initForm()
		this.initObsevable()
		this.candidateService.getCandidatesFromServ()
	}

	private initForm(): void {
		this.searchCtrl = this.formBuilder.control('')
		this.searchTypeCtrl = this.formBuilder.control(
			CandidateSearchType.LASTNAME
		)
		this.searchTypeOptions = [
			{ value: CandidateSearchType.LASTNAME, label: 'Nom' },
			{ value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
			{ value: CandidateSearchType.COMPANY, label: 'Entreprise' },
		]
	}

	private initObsevable(): void {
		this.loading$ = this.candidateService.loading$

		const search$: Observable<string> = this.searchCtrl.valueChanges.pipe(
			startWith(this.searchCtrl.value),
			map((value: string): string => value.trim().toLowerCase())
		)

		const searchType$: Observable<CandidateSearchType> =
			this.searchTypeCtrl.valueChanges.pipe(
				startWith(this.searchTypeCtrl.value)
			)

		this.candidates$ = combineLatest([
			search$,
			searchType$,
			this.candidateService.candidates$,
		]).pipe(
			map(([search, searchType, candidates]): Candidate[] =>
				candidates.filter((candidate: Candidate): boolean =>
					candidate[searchType]
						.toLowerCase()
						.includes(search as string)
				)
			)
		)
	}
}
