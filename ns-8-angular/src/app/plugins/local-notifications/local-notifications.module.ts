import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptLocalizeModule } from '@nativescript/localize/angular';
import { LocalNotificationsComponent } from './local-notifications.component';
import { LocalNotificationsService } from "./local-notifications.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptLocalizeModule, NativeScriptRouterModule.forChild([{ path: '', component: LocalNotificationsComponent }])],
	declarations: [LocalNotificationsComponent],
  providers: [LocalNotificationsService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class LocalNotificationsModule {}
