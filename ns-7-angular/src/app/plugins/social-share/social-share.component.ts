import { Component, NgZone } from '@angular/core';
import { DemoSharedSocialShare } from './social-share.service';

@Component({
	selector: 'demo-social-share',
	templateUrl: 'social-share.component.html',
})
export class SocialShareComponent {
	demoShared: DemoSharedSocialShare;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedSocialShare();
	}
}
