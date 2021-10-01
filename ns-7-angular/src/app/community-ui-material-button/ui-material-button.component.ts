import { Component, NgZone } from '@angular/core';

@Component({
	selector: 'demo-ui-material-button',
	templateUrl: 'ui-material-button.component.html',
})
export class UiMaterialButtonComponent {

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
	}
}
