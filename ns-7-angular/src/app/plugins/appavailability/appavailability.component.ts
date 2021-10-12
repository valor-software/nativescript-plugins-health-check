import { Component, NgZone } from '@angular/core';
import { availableSync } from '@nativescript/appavailability';


@Component({
	selector: 'demo-appavailability',
	templateUrl: 'appavailability.component.html',
})
export class AppavailabilityComponent {
	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
	}

  async testIt() {
    const avail: boolean = await availableSync('twitter://');
    console.log('App available? ' +  avail);
  }
}
