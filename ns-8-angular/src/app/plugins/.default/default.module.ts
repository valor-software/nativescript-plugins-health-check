import { DefaultComponent } from "./default.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([{ path: '', component: DefaultComponent }])
  ],
  declarations: [DefaultComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DefaultModule {}
