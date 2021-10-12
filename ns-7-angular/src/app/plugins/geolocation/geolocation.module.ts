import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { GeolocationComponent } from './geolocation.component';
import { GeolocationService } from "./geolocation.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: GeolocationComponent }])],
	declarations: [GeolocationComponent],
  providers: [GeolocationService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class GeolocationModule {}
