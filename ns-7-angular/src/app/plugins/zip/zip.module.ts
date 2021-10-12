import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ZipComponent } from './zip.component';
import { ZipService } from "./zip.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: ZipComponent }])],
	declarations: [ZipComponent],
  providers: [ZipService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class ZipModule {}
