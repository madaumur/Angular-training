import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
	// Pas de routes directement, mais du lazy loading
	{
		path: 'social-media',
		loadChildren: () =>
			import('./social-media/social-media.module').then(
				(m) => m.SocialMediaModule
			),
	},
	{
		path: 'complex-form',
		loadChildren: () =>
			import('./complex-form/complex-form.module').then(
				(m) => m.ComplexFormModule
			),
	},
	{
		path: 'reactive-state',
		loadChildren: () =>
			import('./reactive-state/reactive-state.module').then(
				(m) => m.ReactiveStateModule
			),
	},
	// Pour n'importe qu'elle route non reconnue
	{ path: '**', redirectTo: 'social-media' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
