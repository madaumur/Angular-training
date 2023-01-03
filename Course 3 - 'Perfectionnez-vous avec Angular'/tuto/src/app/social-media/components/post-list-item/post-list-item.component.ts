import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { Post } from '../../models/post.model'

@Component({
	selector: 'app-post-list-item',
	templateUrl: './post-list-item.component.html',
	styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent implements OnInit {
	@Input() post!: Post
	@Output() postCommented: EventEmitter<{ comment: string; postId: number }> =
		new EventEmitter<{ comment: string; postId: number }>()

	tempUser: { firstname: string; lastname: string } = {
		firstname: 'José',
		lastname: 'Bové',
	}
	constructor() {}

	ngOnInit(): void {}

	onNewComment(comment: string): void {
		this.postCommented.emit({ comment: comment, postId: this.post.id })
	}
}
