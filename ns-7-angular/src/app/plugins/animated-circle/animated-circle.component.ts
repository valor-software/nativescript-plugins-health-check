import { Component, NgZone } from '@angular/core';


@Component({
	selector: 'demo-animated-circle',
	templateUrl: 'animated-circle.component.html',
})
export class AnimatedCircleComponent {
	circleProgress: number = 30;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		setInterval(() => {
			if (this.circleProgress === 100) {
				this.circleProgress = 0;
			}
			this.circleProgress++;
		}, 100);
	}
}
