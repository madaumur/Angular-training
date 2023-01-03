import { animate, animation, sequence, style } from '@angular/animations'

export const slideAndFadeAnimation = animation([
	style({
		transform: 'translateY(-100%)',
		opacity: 0,
		'background-color': '{{ startColor }}',
	}),
	animate(
		'{{ time }} ease-in-out',
		style({
			transform: 'translateY(0%)',
			opacity: 1,
		})
	),
])
