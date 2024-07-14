import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css', '/src/app/app.component.scss'],
})
export class HeaderComponent {
	public isLogged = false;
}
