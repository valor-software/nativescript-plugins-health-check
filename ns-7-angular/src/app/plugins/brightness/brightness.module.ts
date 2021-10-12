import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { BrightnessComponent } from './brightness.component';
import { BrightnessService } from "./brightness.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: BrightnessComponent }])],
	declarations: [BrightnessComponent],
  providers: [BrightnessService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class BrightnessModule {}
