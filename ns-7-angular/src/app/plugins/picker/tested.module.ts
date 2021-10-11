import { TestedComponent } from "./tested.component";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";


@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([{ path: '', component: TestedComponent }])
  ],
  declarations: [TestedComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TestedModule {}
