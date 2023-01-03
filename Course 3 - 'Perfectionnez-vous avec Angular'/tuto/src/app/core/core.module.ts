import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	declarations: [
		HeaderComponent
	],

	imports: [
		CommonModule,
		// pour mettre a dispo les elements communs à toutes l'app
		SharedModule,
		// on pourrait le mettre dans le shared module mais a priori ca peut creer des bugs
		RouterModule,
		HttpClientModule,
		BrowserAnimationsModule,
	],

	exports: [
		HeaderComponent
	],
})


export class CoreModule { }
