import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SocialShareComponent } from './social-share.component';
import { SocialShareService } from "./social-share.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SocialShareComponent }])],
	declarations: [SocialShareComponent],
  providers: [SocialShareService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class SocialShareModule {}
