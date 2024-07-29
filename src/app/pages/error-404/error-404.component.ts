import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-error-404',
	standalone: true,
	imports: [RouterModule, MatButtonModule],
	templateUrl: './error-404.component.html',
	styleUrl: './error-404.component.css',
})
export class Error404Component {}
