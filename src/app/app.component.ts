import { Component, OnInit } from '@angular/core';
import { maxBy } from 'lodash-es';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit() {
    this.initItems();
    this.initContainer();

    this.containerStyleChange.subscribe(() => {
      this.buildContainerStyles();
    });

    this.buildContainerStyles();
  }

  private buildContainerStyles() {
    this.containerStylesString = this.buildStyles(this.containerStyles);
  }

  private buildStyles(items: ItemStyle[]) {
    let str = '';

    items.forEach((i) => {
      if (i.selected) {
        let itemStr = `${i.option.name}: ${i.value}; `;
        str += itemStr;
      }
    });

    return str;
  }

  public items: FlexItem[] = [];
  public activeItem: FlexItem = null;
  public containerStyles: ItemStyle[] = null;

  public containerStyleChange = new Subject();

  public containerStylesString: string;

  public itemClick(item: FlexItem) {
    this.activeItem = item;
  }

  private initItems() {
    let defaultItems = 3;
    for (let i = 1; i <= defaultItems; i++) {
      this.initItem();
    }

    this.activeItem = this.items[0];
  }

  private initContainer() {
    this.containerStyles = this.containerOptions.map((option) => {

      let s = new ItemStyle();
      s.option = option;
      s.value = option.defaultValue;

      let hasSetDefaultSelection = [true, false].includes(s.option.defaultSelected);
      s.selected = hasSetDefaultSelection ? s.option.defaultSelected : false;

      s.selectedChange.subscribe(() => {
        this.containerStyleChange.next();
      });

      s.valueChange.subscribe(() => {
        this.containerStyleChange.next();
      });

      return s;

    });
  }

  private initItem() {

    let nextNo = 1;
    if (this.items.length) {
      let lastNo = maxBy(this.items, (i) => { return i.no; }).no;
      nextNo = lastNo + 1;
    }

    let item: FlexItem = {
      no: nextNo,
      color: '',
      styles: this.initItemStyles()
    };
    this.items.push(item);
  }

  private initItemStyles() {

    let styles = this.itemOptions.map((option) => {
      let s = new ItemStyle();
      s.option = option;
      s.selected = option.defaultSelected;
      s.value = option.defaultValue;

      return s;
    });
    return styles;
  }

  private containerOptions: ItemOption[] = [
    {
      name: 'display',
      defaultValue: 'flex',
      defaultSelected: true,
      options: [
        'flex',
        'inline-flex'
      ]
    },
    {
      name: 'flex-direction',
      defaultValue: 'row',
      defaultSelected: true,
      options: [
        'row',
        'row-reverse',
        'column',
        'column-reverse'
      ]
    }

  ];

  private itemOptions: ItemOption[] = [
    // {
    //   name: 'flex-direction',
    //   options: [
    //     'row',
    //     'row-reverse',
    //     'column',
    //     'column-reverse'
    //   ]
    // }

  ];

}

export class ItemStyle {
  public option: ItemOption;

  public valueChange = new Subject<string>();
  public selectedChange = new Subject<boolean>();

  private _value: string;
  public get value() {
    return this._value;
  }
  public set value(v: string) {
    this._value = v;
    this.valueChange.next();
  }

  private _selected: boolean;
  public get selected() {
    return this._selected;
  }
  public set selected(v: boolean) {
    this._selected = v;
    this.selectedChange.next();
  }

}



export interface ItemOption {
  name: string;
  options: string[];
  defaultValue?: string;
  defaultSelected?: boolean;
}

export interface FlexItem {
  no: number;
  color: string;
  styles: ItemStyle[];
}

