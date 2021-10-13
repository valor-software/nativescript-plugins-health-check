import { Component, NgZone } from '@angular/core';
import { GeolocationService } from "./geolocation.service";

@Component({
	selector: 'demo-geolocation',
	templateUrl: 'geolocation.component.html',
})
export class GeolocationComponent {

	constructor(private _ngZone: NgZone, public geolocationService: GeolocationService) {}

	ngOnInit() {
	}
}
