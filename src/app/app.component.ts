import { Component, OnInit } from '@angular/core';
import { cloneDeep, maxBy, pull } from 'lodash-es';
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
      this.buildAllStyles();
    });

    this.buildContainerStyles();
    this.buildAllStyles();
  }


  public allStylesCurrent = '';

  private buildContainerStyles() {
    this.containerStylesString = this.buildStyles(this.containerStyles);
  }

  private buildAllStyles() {
    let cStyles = this.buildStyles(this.containerStyles);

    let iStyles = '';
    this.items.forEach((i) => {
      let iStyle = this.buildStyles(i.styles);
      iStyles += `.item${i.no} {\n${iStyle}}\n`;
    });

    let allStyles = `.container {\n${cStyles}}\n\n${iStyles}`;
    allStyles = this.replaceAll(allStyles, ';', ';\n');

    this.allStylesCurrent = allStyles;
  }

  private replaceAll(text: string, search: string, replacement: string) {
    return text.split(search).join(replacement);
  }

  private buildStyles(items: ItemStyle[]) {
    let str = '';

    if (!items) {
      return '';
    }

    items.forEach((i) => {
      if (i.selected) {
        let v = i.isCustom ? i.customValue : i.value;
        let itemStr = `${i.option.name}: ${v};`;
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

  private getItemStyles(clone: boolean, no: number) {
    if (!clone) {
      return this.initItemStyles(no);
    }

    let styles = cloneDeep(this.activeItem.styles);
    let colorStyle = styles.find((i) => { return i.option.name === 'background-color' });
    colorStyle.value = ItemsOptions.getColor(no);

    return styles;
  }

  private initItem(clone = false) {

    let nextNo = 1;
    if (this.items.length) {
      let lastNo = maxBy(this.items, (i) => { return i.no; }).no;
      nextNo = lastNo + 1;
    }

    let item: FlexItem = {
      no: nextNo,
      styles: this.getItemStyles(clone, nextNo),
      builtStyles: new BehaviorSubject<string>('')
    };

    item.builtStyles.subscribe(() => {
      this.buildAllStyles();
    });

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
    });

    let styles = this.buildStyles(item.styles);

    setTimeout(() => {
      item.builtStyles.next(styles);
    });

    this.items.push(item);
  }

  public addItemClick() {
    this.initItem();
  }

  public removeActiveItemClick() {
    if (this.activeItem) {
      pull(this.items, this.activeItem);
      this.activeItem = null;
    }
  }

  public cloneActiveItemClick() {
    if (this.activeItem) {
      this.initItem(true);
    }
  }

  public showCss = false;

  public showCssClick() {
    this.showCss = true;
  }

  public cssCloseClick() {
    this.showCss = false;
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




