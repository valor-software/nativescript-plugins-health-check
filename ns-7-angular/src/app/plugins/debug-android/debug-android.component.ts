import { Component, NgZone } from '@angular/core';

@Component({
	selector: 'demo-debug-android',
	templateUrl: 'debug-android.component.html',
})
export class DebugAndroidComponent {

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
	}
}
