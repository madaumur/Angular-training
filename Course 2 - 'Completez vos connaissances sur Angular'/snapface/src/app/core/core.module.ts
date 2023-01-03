import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpInterceptorProviders } from './interceptors';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
	declarations: [
		HeaderComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule
	],
	exports: [
		HeaderComponent
	],
	providers: [
		HttpInterceptorProviders
	],
})
export class CoreModule { }
