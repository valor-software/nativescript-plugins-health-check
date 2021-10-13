import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { BackgroundHttpComponent } from './background-http.component';
import { BackgroundHttpService } from "./background-http.service";

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: BackgroundHttpComponent }])],
	declarations: [BackgroundHttpComponent],
  providers: [BackgroundHttpService],
	schemas: [NO_ERRORS_SCHEMA],
})
export class BackgroundHttpModule {}
