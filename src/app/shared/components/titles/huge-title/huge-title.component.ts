import { Component, input } from '@angular/core';

@Component({
	selector: 'app-huge-title',
	standalone: true,
	imports: [],
	template: `<h3 class="mb-5 mt-3">{{ text() }}</h3>`,
	styles: `
		@import "../../../../../styles.scss";

		* {
		color: map-get($map: $text-palette, $key: primary);
		font-size: 1.8rem;
		font-weight: 700;
		text-align: center;
		text-wrap: balance;
		}
	`,
})
export class HugeTitleComponent {
	public text = input.required<string>();
}
