import { Component, NgZone } from '@angular/core';
import { BackgroundHttpService } from "./background-http.service";

@Component({
	selector: 'demo-background-http',
	templateUrl: 'background-http.component.html',
})
export class BackgroundHttpComponent {

	constructor(private _ngZone: NgZone, public backgroundHttpService: BackgroundHttpService) {}

	ngOnInit() {
	}
}
