import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
	BehaviorSubject,
	Observable,
	delay,
	map,
	switchMap,
	take,
	tap,
} from 'rxjs'
import { Candidate } from '../models/candidate.model'

@Injectable()
export class CandidateService {
	constructor(private http: HttpClient) {}

	/*
		BehaviorSubject - subject qui va réémettre sa dernière émission a chaque nouvelle souscription
		Diff avec les subject car on doit lui mettre une valeur par défault | car nouvelle souscription au subject n'emmete rien
		car version private
	*/
	private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	)

	// Getter - on aurait pu faire une méthode getLoading()
	get loading$(): Observable<boolean> {
		return this._loading$.asObservable()
	}

	// Setter
	private setLoadingStatus(loading: boolean): void {
		this._loading$.next(loading)
	}

	private _candidates$: BehaviorSubject<Candidate[]> = new BehaviorSubject<
		Candidate[]
	>([])

	get candidates$(): Observable<Candidate[]> {
		return this._candidates$.asObservable()
	}

	private lastCandidateLoad: number = 0

	// méthode appellée depuis le component
	// On ne retourne pas l'observable car le component est deja souscrit a lui (on dit qu'on dispatch une action)
	getCandidatesFromServ(): void {
		if (Date.now() - this.lastCandidateLoad <= 300000) {
			return
		} // la valeur 300 000 = interval de 5min

		this.setLoadingStatus(true)
		this.http
			.get<Candidate[]>(`${environment.apiUrl}/candidates`)
			.pipe(
				delay(1000),
				tap((candidates: Candidate[]): void => {
					this._candidates$.next(candidates)
					this.setLoadingStatus(false)
					this.lastCandidateLoad = Date.now()
				})
			)
			.subscribe()
	}

	// @ TODO pas robuste on ne verifie pas si le candidat n'existe pas
	getCandidateById(id: number): Observable<Candidate> {
		if (!this.lastCandidateLoad) {
			this.getCandidatesFromServ()
		}
		return this.candidates$.pipe(
			map(
				(candidates: Candidate[]) =>
					candidates.filter(
						(candidate: Candidate): boolean => candidate.id === id
					)[0]
			)
		)
	}

	/**
	 * 	On va envoyer la requete pour suppr un candidat, puis mise a jour de l'affichage sans nouvelle requete
	 * 	C'est une version pessimiste ou l'on va attendre la réponse du serv pour agir
	 */
	refuseCandidate(id: number): void {
		this.setLoadingStatus(true)
		// On va attendre la réponse du serveur pour finir l'opération
		this.http
			.delete(`${environment.apiUrl}/candidates/${id}`)
			.pipe(
				delay(1000),
				// switch map pour n'importe quel autre opé, on récup les candidats
				switchMap((): Observable<Candidate[]> => this.candidates$),
				take(1),
				// on récup tous les candidates et on filtre a tous sauf celui qu'on veut suppr
				map((candidates: Candidate[]): Candidate[] =>
					candidates.filter(
						(candidate: Candidate): boolean => candidate.id !== id
					)
				),
				// maj du behavior subject
				tap((candidates: Candidate[]): void => {
					this.setLoadingStatus(false)
					this._candidates$.next(candidates)
				})
			)
			.subscribe()
	}

	/**
	 *	Ce sera une version optimmiste ou l'on va anticiper que le serv fait ce qu'on lui demande
	 */
	hireCandidate(id: number): void {
		this._candidates$
			.pipe(
				take(1),
				map((candidates: Candidate[]): Candidate[] =>
					candidates.map(
						(candidate: Candidate): Candidate =>
							candidate.id === id
								? { ...candidate, company: 'SnapFace LTD' }
								: candidate
					)
				),
				tap((updatedCandidates: Candidate[]): void =>
					this._candidates$.next(updatedCandidates)
				),
				delay(1000),
				switchMap(
					(updatedCandidates: Candidate[]): Observable<object> =>
						this.http.patch(
							`${environment.apiUrl}/candidates/${id}`,
							updatedCandidates.find(
								(candidate: Candidate): boolean =>
									candidate.id === id
							)
						)
				)
			)
			.subscribe()
	}
}
