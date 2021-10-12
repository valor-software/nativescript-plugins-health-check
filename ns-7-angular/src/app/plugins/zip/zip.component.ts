import { Component, NgZone } from '@angular/core';
import { ZipService } from "./zip.service";

@Component({
	selector: 'demo-zip',
	templateUrl: 'zip.component.html',
})
export class ZipComponent {

	constructor(private _ngZone: NgZone, public zipService: ZipService) {}

	ngOnInit() {
	}
}
