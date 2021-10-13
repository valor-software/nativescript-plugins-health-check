import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule } from '@nativescript/angular';

import { DirectionsComponent } from './directions.component';
import { DirectionsService } from "./directions.service";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		NativeScriptFormsModule,
		NativeScriptRouterModule.forChild([
			{
				path: '',
				component: DirectionsComponent,
			},
		]),
	],
	declarations: [DirectionsComponent],
  providers: [DirectionsService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class DirectionsModule {}
