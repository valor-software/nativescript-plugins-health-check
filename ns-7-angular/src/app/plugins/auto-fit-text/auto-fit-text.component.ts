import { Component, NgZone } from '@angular/core';
import { } from '@nativescript/auto-fit-text';

@Component({
	selector: 'demo-auto-fit-text',
	templateUrl: 'auto-fit-text.component.html',
})
export class AutoFitTextComponent {
	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
	}
}
