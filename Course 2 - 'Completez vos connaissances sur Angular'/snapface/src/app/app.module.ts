import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FaceSnapsModule } from './face-snaps/face-snaps.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { AuthModule } from './auth/auth.module';

@NgModule({

	declarations: [
		AppComponent,
	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		LandingPageModule,
		FaceSnapsModule,
		AuthModule
	],

	providers: [
	],

	bootstrap: [AppComponent]
})

export class AppModule {}
