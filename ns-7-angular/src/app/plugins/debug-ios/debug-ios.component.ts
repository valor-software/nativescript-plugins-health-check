import { Component, NgZone } from '@angular/core';
import { NativeScriptDebugIOS } from '@nativescript/debug-ios';


@Component({
	selector: 'demo-debug-ios',
	templateUrl: 'debug-ios.component.html',
})
export class DebugIosComponent {

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
    NativeScriptDebugIOS.show();
	}
}
