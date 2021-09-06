import { Component, Input, OnInit } from '@angular/core';
import { ItemOption, ItemStyle } from '../ints';

@Component({
    selector: 'app-styles-list',
    templateUrl: 'styles-list.html',    
})

export class StylesListComponent implements OnInit {
    constructor() { }

    @Input()
    public styles: ItemStyle[];

    ngOnInit() { }

    public allOptions(o: ItemOption) {
        if (o.customValue) {
          return ['custom'].concat(o.options);
        }
    
        return o.options;
      }
}