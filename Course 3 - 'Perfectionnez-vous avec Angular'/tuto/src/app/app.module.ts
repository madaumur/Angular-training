import { CoreModule } from './core/core.module'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SharedModule } from './shared/shared.module'

@NgModule({
	declarations: [AppComponent],

	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		// pour mettre a dispo les elements communs à toutes l'app
		SharedModule,
	],

	providers: [],

	bootstrap: [AppComponent],
})
export class AppModule {}
