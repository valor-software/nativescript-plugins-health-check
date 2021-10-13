import { Component, NgZone } from '@angular/core';
import { IqkeyboardmanagerService } from "./iqkeyboardmanager.service";

@Component({
	selector: 'demo-iqkeyboardmanager',
	templateUrl: 'iqkeyboardmanager.component.html',
})
export class IqkeyboardmanagerComponent {

	constructor(private _ngZone: NgZone, public iqkeyboardmanagerService: IqkeyboardmanagerService) {}

	ngOnInit() {
	}
}
