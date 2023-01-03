import {
	AfterViewInit,
	Directive,
	ElementRef,
	Renderer2,
	Input,
	HostListener,
} from '@angular/core'

@Directive({ selector: '[highlight]' })
export class HighlightDirective implements AfterViewInit {
	@Input() color: string = 'yellow'

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	ngAfterViewInit(): void {
		this.setBackgroundColor(this.color)
	}

	setBackgroundColor(color: string): void {
		this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color)
	}

	@HostListener('mouseenter') onMouseEnter(): void {
		this.setBackgroundColor('yellow')
	}

	@HostListener('mouseleave') onMouseLeave(): void {
		this.setBackgroundColor(this.color)
	}
}
