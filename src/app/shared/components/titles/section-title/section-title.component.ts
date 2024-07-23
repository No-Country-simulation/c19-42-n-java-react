import { Component, input } from '@angular/core';

@Component({
	selector: 'app-section-title',
	standalone: true,
	imports: [],
	template: ` <h3 class="section-title fw-bold mb-4">{{ text() }}</h3> `,
})
export class SectionTitleComponent {
	public text = input.required<string>();
}
