import { Component, NgZone } from '@angular/core';
import { FingerprintAuthService } from "./fingerprint-auth.service";

@Component({
	selector: 'demo-fingerprint-auth',
	templateUrl: 'fingerprint-auth.component.html',
})
export class FingerprintAuthComponent {

	constructor(private _ngZone: NgZone, public fingerprintAuthService: FingerprintAuthService) {}

	ngOnInit() {
	}
}
