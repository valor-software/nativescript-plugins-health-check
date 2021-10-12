import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedNotificationDelegateComponent } from './shared-notification-delegate.component';
import { SharedNotificationDelegateService } from "./shared-notification-delegate.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SharedNotificationDelegateComponent }])],
	declarations: [SharedNotificationDelegateComponent],
  providers: [SharedNotificationDelegateService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class SharedNotificationDelegateModule {}
