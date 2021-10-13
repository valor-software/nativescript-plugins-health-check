import { Component, NgZone } from '@angular/core';
import { SocialShareService } from "./social-share.service";

@Component({
	selector: 'demo-social-share',
	templateUrl: 'social-share.component.html',
})
export class SocialShareComponent {

	constructor(private _ngZone: NgZone, public socialShareService: SocialShareService) {}

	ngOnInit() {
	}
}
