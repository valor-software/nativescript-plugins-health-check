import { Component, NgZone } from '@angular/core';
import { PickerService } from "./picker.service";

@Component({
  selector: 'ns-tested',
  templateUrl: 'picker.component.html',
})
export class PickerComponent {

  constructor(private _ngZone: NgZone, public pickerService: PickerService) {}

  ngOnInit() {
    this.pickerService.observableDataItems = this.pickerService.getDataItems(20);
  }
}
