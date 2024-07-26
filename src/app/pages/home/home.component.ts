import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SectionTitleComponent } from '../../shared/components/titles/section-title/section-title.component';
import { RouterModule } from '@angular/router';
import { LittleTitleComponent } from '../../shared/components/titles/little-title/little-title.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RouterModule,
		MatCardModule,
		MatButtonModule,
		SectionTitleComponent,
		LittleTitleComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
	public teamMembers = [
		{
			name: 'Diego Díaz',
			position: 'Product Manager',
			photo: 'https://media.licdn.com/dms/image/D4E35AQGcOyCZ1P3U_A/profile-framedphoto-shrink_200_200/0/1719495986757?e=1722376800&v=beta&t=YiHmBLcadR3JSKYZ3_ZDpeH-G8wabFJykARaxhqG1UU',
			linkedIn: 'https://www.linkedin.com/in/diego-d%C3%ADaz-44633a28b/',
		},
		{
			name: 'Nuri Ibañez',
			position: 'Analista QA',
			photo: 'https://media.licdn.com/dms/image/D4E03AQGKkmJcDE_fEQ/profile-displayphoto-shrink_200_200/0/1718241924680?e=1727308800&v=beta&t=tffTuo8jBvQ1a6Vtfc1JPuyTSZX2TCeUrcCSEnKb674',
			linkedIn: 'https://www.linkedin.com/in/nuriei/',
		},
		{
			name: 'Melania Racacha Flores',
			position: 'Diseñadora UX/UI',
			photo: 'https://media.licdn.com/dms/image/D4E03AQEgeN9WkCTnBg/profile-displayphoto-shrink_200_200/0/1714324899502?e=1727308800&v=beta&t=FTdEO_m2k9cKBxtJi7I0KZAESnkGN4YimTdREWO170w',
			linkedIn: 'https://www.linkedin.com/in/melania-racacha-flores/',
		},
		{
			name: 'Ignacio Revainera',
			position: 'Desarrollador Frontend',
			photo: 'https://media.licdn.com/dms/image/D4D03AQGtQ3dTfGND5A/profile-displayphoto-shrink_200_200/0/1706386569814?e=1727308800&v=beta&t=oGJiePqcJSS0wfD3SzgWPVWswjdsGSjG_qpoS1n309A',
			linkedIn: 'https://www.linkedin.com/in/ignaciorevainera',
		},
		{
			name: 'Nestor Rubiano',
			position: 'Desarrollador Frontend',
			photo: 'https://media.licdn.com/dms/image/D4D35AQGxHP3zM8VbYA/profile-framedphoto-shrink_200_200/0/1683771078424?e=1722376800&v=beta&t=rLbIYXqUpP-MoA4bhsaAHLUsIKtDIxTIfZ4lTUQ9sms',
			linkedIn: 'https://www.linkedin.com/in/nestor-rubiano-b205a9270/',
		},
		{
			name: 'Hugo Catalán',
			position: 'Desarrollador Frontend',
			photo: 'https://media.licdn.com/dms/image/D4D35AQHTfx8gXA0mVA/profile-framedphoto-shrink_200_200/0/1702834926233?e=1722376800&v=beta&t=25kPuKyG61YFfM5OByTXcUnGZbonk_22aKbW9MizmZY',
			linkedIn: 'https://www.linkedin.com/in/hugo-catalan-895886133/',
		},
		{
			name: 'Sebastián Velarde',
			position: 'Desarrollador Backend',
			photo: 'https://media.licdn.com/dms/image/D4E35AQFtvSumYj1ydw/profile-framedphoto-shrink_200_200/0/1718827742551?e=1722376800&v=beta&t=kcihn4NDK-cHxZeMYAYw8CGLAH8nzUam7eJGcoEi8oc',
			linkedIn: 'https://www.linkedin.com/in/sebasvelardedev/',
		},
		{
			name: 'Abel Fucili',
			position: 'Desarrollador Backend',
			photo: 'https://media.licdn.com/dms/image/D4D35AQEVFYoSB1IQjg/profile-framedphoto-shrink_200_200/0/1698411680805?e=1722376800&v=beta&t=O3l7aCOPgaEb6pFYiYB1WDjEO5e0r084z-f3bZ9F4nw',
			linkedIn: 'https://www.linkedin.com/in/abel-fucili-12055aa5/',
		},
	];
}
