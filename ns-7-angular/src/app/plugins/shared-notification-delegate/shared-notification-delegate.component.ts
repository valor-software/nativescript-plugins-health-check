import { Component, NgZone } from '@angular/core';
import { SharedNotificationDelegateService } from "./shared-notification-delegate.service";

@Component({
	selector: 'demo-shared-notification-delegate',
	templateUrl: 'shared-notification-delegate.component.html',
})
export class SharedNotificationDelegateComponent {

	constructor(private _ngZone: NgZone, public sharedNotificationDelegateService: SharedNotificationDelegateService) {}

	ngOnInit() {
	}
}
