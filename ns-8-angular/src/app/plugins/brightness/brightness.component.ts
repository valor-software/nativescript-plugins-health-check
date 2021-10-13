import { Component, NgZone } from '@angular/core';
import { BrightnessService } from "./brightness.service";

@Component({
	selector: 'demo-brightness',
	templateUrl: 'brightness.component.html',
})
export class BrightnessComponent {

	constructor(private _ngZone: NgZone, public brightnessService: BrightnessService) {}

	ngOnInit() {
		this.brightnessService.setBrightness(10);
		setTimeout(() => {
			this.brightnessService.setBrightness(50);
		}, 2000);
	}
}
