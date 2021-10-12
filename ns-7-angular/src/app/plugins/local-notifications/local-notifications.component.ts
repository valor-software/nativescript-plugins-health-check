import { Component, NgZone } from '@angular/core';
import { LocalNotificationsService } from "./local-notifications.service";

@Component({
	selector: 'demo-local-notifications',
	templateUrl: 'local-notifications.component.html',
})
export class LocalNotificationsComponent {

	constructor(private _ngZone: NgZone, public localNotificationsService: LocalNotificationsService) {}

	ngOnInit() {
	}
}
