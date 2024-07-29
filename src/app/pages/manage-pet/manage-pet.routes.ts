import { Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { PetCreateComponent } from './pet-create/pet-create.component';
import { PetDeleteComponent } from './pet-delete/pet-delete.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';

export const MANAGE_PET_ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
	{
		path: 'list',
		component: PetListComponent,
	},
	{
		path: 'edit/:id',
		component: PetEditComponent,
	},
	{
		path: 'create',
		component: PetCreateComponent,
	},
	{
		path: 'delete/:id',
		component: PetDeleteComponent,
	},
	{
		path: 'detail/:id',
		component: PetDetailComponent,
	},
];
