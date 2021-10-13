import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, registerElement } from '@nativescript/angular';
import { IqkeyboardmanagerComponent } from './iqkeyboardmanager.component';
import { IqkeyboardmanagerService } from "./iqkeyboardmanager.service";

registerElement("PreviousNextView", () => require("@nativescript/iqkeyboardmanager").PreviousNextView);

@NgModule({
	imports: [
	  NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([{ path: '', component: IqkeyboardmanagerComponent }])
  ],
	declarations: [IqkeyboardmanagerComponent],
  providers: [IqkeyboardmanagerService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class IqkeyboardmanagerModule {}
