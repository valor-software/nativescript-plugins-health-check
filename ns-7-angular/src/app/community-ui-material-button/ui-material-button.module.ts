import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { UiMaterialButtonComponent } from './ui-material-button.component';
import { NativeScriptMaterialButtonModule } from '@nativescript-community/ui-material-button/angular';

@NgModule({
	imports: [
		NativeScriptCommonModule,
		NativeScriptMaterialButtonModule,
		NativeScriptRouterModule.forChild([{ path: '', component: UiMaterialButtonComponent }])
	],
	declarations: [UiMaterialButtonComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class UiMaterialButtonModule {}
