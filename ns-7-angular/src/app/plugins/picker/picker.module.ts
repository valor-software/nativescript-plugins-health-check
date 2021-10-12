import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { PickerService } from "./picker.service";
import { PickerComponent } from './picker.component';


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([{ path: '', component: PickerComponent }])
  ],
  declarations: [PickerComponent],
  providers: [PickerService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PickerModule {
}
