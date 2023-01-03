import { HighlightDirective } from './directives/highlight.directive'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CommentsComponent } from './components/comments/comments.component'
import { MaterialModule } from './material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { ShortenPipe } from './pipes/shorten.pipe'
import { StringifyNamePipe } from './pipes/stringifyName.pipe'
import { TimeAgoPipe } from './pipes/time-ago.pipe'

@NgModule({
	declarations: [
		CommentsComponent,
		ShortenPipe,
		StringifyNamePipe,
		TimeAgoPipe,
		HighlightDirective,
	],

	imports: [CommonModule, MaterialModule, ReactiveFormsModule],

	exports: [
		MaterialModule,
		CommentsComponent,
		ReactiveFormsModule,
		ShortenPipe,
		StringifyNamePipe,
		TimeAgoPipe,
		HighlightDirective,
	],
})
export class SharedModule {}
