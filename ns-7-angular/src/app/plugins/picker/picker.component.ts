import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'ns-tested',
  templateUrl: 'picker.component.html',
})
export class PickerComponent {

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
  }
}
