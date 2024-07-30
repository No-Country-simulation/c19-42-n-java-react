import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HowToAdoptComponent } from './pages/how-to-adopt/how-to-adopt.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DonateComponent } from './pages/donate/donate.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { ShelterProfileComponent } from './pages/profile/shelter-profile/shelter-profile.component';
import { AdopterProfileComponent } from './pages/profile/adopter-profile/adopter-profile.component';
import { PetProfileComponent } from './pages/profile/pet-profile/pet-profile.component';
import { PetEditComponent } from './pages/manage-pet/pet-edit/pet-edit.component';
import { PetCreateComponent } from './pages/manage-pet/pet-create/pet-create.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'home',
		redirectTo: '',
		pathMatch: 'full',
	},
	{
		path: 'gallery',
		component: GalleryComponent,
		data: { title: 'Gallery - Adopción de Mascotas' },
	},
	{
		path: 'how-to-adopt',
		component: HowToAdoptComponent,
		data: { title: 'How to Adopt - Adopción de Mascotas' },
	},
	{
		path: 'contact',
		component: ContactComponent,
		data: { title: 'Contact - Adopción de Mascotas' },
	},
	{
		path: 'donate',
		component: DonateComponent,
		data: { title: 'Donate - Adopción de Mascotas' },
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.routes').then((m) => m.ROUTES_AUTH),
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./pages/admin/admin.routes').then((m) => m.ROUTES_ADMIN),
	},
	{
		path: 'manage-pet',
		loadChildren: () =>
			import('./pages/manage-pet/manage-pet.routes').then(
				(m) => m.MANAGE_PET_ROUTES
			),
	},
	{ path: 'shelter/:shelterId', component: ShelterProfileComponent },
	{
		path: 'shelter/:shelterId/pet/:petId',
		component: PetProfileComponent,
	},
	{
		path: 'shelter/:shelterId/pet/:petId/edit',
		component: PetEditComponent,
	},
	{
		path: 'shelter/:shelterId/create',
		component: PetCreateComponent,
	},
	{ path: 'adopter/:adopterId', component: AdopterProfileComponent },
	{
		path: '**',
		component: Error404Component,
	},
];
