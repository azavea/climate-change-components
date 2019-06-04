import { Component, Input, Output, EventEmitter } from '@angular/core';

/*  Units Dropdown Component

    -- Requires handling unit selection
    Expected use:
        <ccc-units-dropdown
            [units]="available_units"
            [unit]="your_unit"
            (unitSelected)="onUnitSelected($event)">
*/

@Component({
  selector: 'ccc-units-dropdown',
  templateUrl: './units-dropdown.component.html'
})
export class UnitsDropdownComponent {

    @Input() units: [string];
    @Input() unit: string;
    @Output() unitSelected = new EventEmitter<string>();

    public onUnitSelected(unit: string) {
        this.unitSelected.emit(unit);
    }
}
