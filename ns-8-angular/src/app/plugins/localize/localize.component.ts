import { Component, NgZone } from '@angular/core';
import {} from '@nativescript/localize';

@Component({
	selector: 'demo-localize',
	templateUrl: 'localize.component.html',
})
export class LocalizeComponent {

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
	}
}
