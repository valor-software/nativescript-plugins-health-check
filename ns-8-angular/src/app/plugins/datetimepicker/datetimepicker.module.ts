import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { DatetimepickerComponent } from './datetimepicker.component';
import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { DatetimepickerService } from "./datetimepicker.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: DatetimepickerComponent }]), NativeScriptDateTimePickerModule],
	declarations: [DatetimepickerComponent],
  providers: [DatetimepickerService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class DatetimepickerModule {}
