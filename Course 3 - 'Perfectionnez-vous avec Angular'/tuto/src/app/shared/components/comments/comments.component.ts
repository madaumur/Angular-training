import { FormControl, FormBuilder, Validators } from '@angular/forms'
import { Comment } from './../../../core/models/comment.model'
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'
import {
	animate,
	state,
	style,
	trigger,
	transition,
	query,
	group,
	sequence,
	stagger,
	animateChild,
	useAnimation,
} from '@angular/animations'
import { flashAnimation } from '../../animations/flash.animation'
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation'

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	animations: [
		trigger('list', [
			transition('void => *', [
				query('@listItem', [stagger(100, [animateChild()])]),
			]),
		]),
		trigger('listItem', [
			state('default', style({ transform: 'scale(1)' })), //possible de spécifier le z-index s'il y a des
			state(
				'active',
				style({
					transform: 'scale(1.05)',
					'background-color': '#536DFE',
				})
			),
			transition('default => active', [animate('200ms ease-in-out')]),
			transition('active => default', [animate('400ms ease-in-out')]),
			transition('void => *', [
				query('.comment-text, .comment-date', [style({ opacity: 0 })]),
				useAnimation(slideAndFadeAnimation, {
					params: {
						time: '300ms',
						startColor: '',
					},
				}),
				group([
					useAnimation(flashAnimation, {
						params: {
							time: '300ms',
							flashColor: '#536DFE',
						},
					}),
					query('.comment-text', [
						animate('250ms', style({ opacity: 1 })),
					]),
					query('.comment-date', [
						animate('500ms', style({ opacity: 1 })),
					]),
				]),
			]),
		]),
	],
})
export class CommentsComponent implements OnInit {
	@Input() comments!: Comment[]
	@Output() newComment: EventEmitter<string> = new EventEmitter<string>()

	commentCtrl!: FormControl
	animationState: { [key: number]: 'default' | 'active' } = {}

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.commentCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(10),
		])
		for (let index in this.comments) {
			this.animationState[index] = 'default'
		}
	}

	onLeaveComment(): void {
		if (this.commentCtrl.invalid) {
			return
		}
		const maxId: number = Math.max(
			...this.comments.map((comment): number => comment.id)
		)
		this.comments.unshift({
			id: maxId + 1,
			comment: this.commentCtrl.value,
			createdDate: new Date().toISOString(),
			userId: 0,
		})

		this.newComment.emit(this.commentCtrl.value)
		this.commentCtrl.reset()
	}

	onListItemMouseEnter(index: number): void {
		this.animationState[index] = 'active'
	}
	onListItemMouseLeave(index: number): void {
		this.animationState[index] = 'default'
	}
}
