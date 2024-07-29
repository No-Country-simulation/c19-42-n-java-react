import { Component, input } from '@angular/core';

@Component({
	selector: 'app-little-title',
	standalone: true,
	imports: [],
	template: `
		<h3 class="little-title text-uppercase bold mb-2">{{ text() }}</h3>
	`,
	styleUrl: './little-title.component.scss',
})
export class LittleTitleComponent {
	public text = input.required<string>();
}
