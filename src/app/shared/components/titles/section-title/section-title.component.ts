import { Component, input } from '@angular/core';

@Component({
	selector: 'app-section-title',
	standalone: true,
	imports: [],
	template: ` <h3 class="fw-bold mb-4">{{ text() }}</h3> `,
		styles: `@import "../../../../../styles.scss";

	* {
		@media (width >= 576px) {
			font-size: 2.2rem;
		}

		@media (width >= 992px) {
			font-size: 2.8rem;
		}
	}
	`,
})
export class SectionTitleComponent {
	public text = input.required<string>();
}
