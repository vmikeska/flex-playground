import { Component, OnInit } from '@angular/core';
import { maxBy, pull } from 'lodash-es';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContainerOptions } from './container-options';
import { FlexItem, ItemOption, ItemStyle } from './ints';
import { ItemsOptions } from './item-options';

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
        let v = i.isCustom ? i.customValue : i.value;
        let itemStr = `${i.option.name}: ${v}; `;
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
    this.containerStyles = ContainerOptions.containerOptions.map((option) => {

      let s = new ItemStyle();
      s.option = option;
      s.value = option.defaultValue;

      let hasSetDefaultSelection = [true, false].includes(s.option.defaultSelected);
      s.selected = hasSetDefaultSelection ? s.option.defaultSelected : false;

      s.selectedChange.subscribe(() => {
        this.containerStyleChange.next();
      });

      s.valueChange.subscribe(() => {
        if (!s.selected) {
          s.selected = true;
        }

        this.containerStyleChange.next();
      });

      s.customValueChange.subscribe(() => {
        if (!s.selected) {
          s.selected = true;
        }

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
      styles: this.initItemStyles(nextNo),
      builtStyles: new BehaviorSubject<string>('')
    };

    item.styles.forEach((s) => {
      s.selectedChange.subscribe(() => {
        let styles = this.buildStyles(item.styles);
        item.builtStyles.next(styles);
      });

      s.valueChange.subscribe(() => {
        if (!s.selected) {
          s.selected = true;
        }

        let styles = this.buildStyles(item.styles);
        item.builtStyles.next(styles);
      });

      s.customValueChange.subscribe(() => {
        if (!s.selected) {
          s.selected = true;
        }

        let styles = this.buildStyles(item.styles);        
        item.builtStyles.next(styles);
      });
    })

    let styles = this.buildStyles(item.styles);
    item.builtStyles.next(styles);

    this.items.push(item);
  }

  public addItemClick() {
    this.initItem();
  }

  public removeActiveItemClick() {
    pull(this.items, this.activeItem);
    this.activeItem = null;
  }

  private initItemStyles(no: number) {

    let opts = ItemsOptions.getItemOptions(no);

    let styles = opts.map((option) => {
      let s = new ItemStyle();
      s.option = option;
      s.selected = option.defaultSelected;
      s.value = option.defaultValue;
      s.customValue = option.defaultCustomValue;

      return s;
    });
    return styles;
  }

}

  


