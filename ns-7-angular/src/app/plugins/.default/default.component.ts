import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'ns-default',
  templateUrl: 'default.component.html',
})
export class DefaultComponent {

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
  }
}
