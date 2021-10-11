import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'ns-tested',
  templateUrl: 'tested.component.html',
})
export class TestedComponent {

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
  }
}
