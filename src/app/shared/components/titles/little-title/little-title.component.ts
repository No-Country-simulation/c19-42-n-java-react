import { Component, input } from '@angular/core';

@Component({
	selector: 'app-little-title',
	standalone: true,
	imports: [],
	template: ` <h3 class="mb-2">{{ text() }}</h3> `,
})
export class LittleTitleComponent {
	public text = input.required<string>();
}
