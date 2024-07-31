import { Component } from '@angular/core';

@Component({
	selector: 'app-how-to-adopt',
	standalone: true,
	imports: [],
	templateUrl: './how-to-adopt.component.html',
	styleUrl: './how-to-adopt.component.scss',
})
export class HowToAdoptComponent {
	public listItems = [
		{
			id: 1,
			text: 'Completar un formulario que incluya información personal y detalles sobre la vivienda y el adoptante.',
		},
		{
			id: 2,
			text: 'Pasar una pequeña entrevista con el personal del albergue para discutir la adopción.',
		},
		{
			id: 3,
			text: 'Incluir referencias personales o de veterinarios en el formulario.',
		},
		{
			id: 4,
			text: 'El adoptante debe coordinar una visita al albergue para conocer a la mascota.',
		},
		{
			id: 5,
			text: 'El proceso incluye una tarifa de adopción que ayuda a cubrir los costos de atención médica y mantenimiento de las mascotas.',
		},
		{
			id: 6,
			text: 'El adoptante debe estar dispuesto a comprometerse a cuidar de la mascota durante su vida',
		},
	];
}
