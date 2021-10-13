import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { FingerprintAuthComponent } from './fingerprint-auth.component';
import { FingerprintAuthService } from "./fingerprint-auth.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: FingerprintAuthComponent }])],
	declarations: [FingerprintAuthComponent],
  providers: [FingerprintAuthService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class FingerprintAuthModule {}
