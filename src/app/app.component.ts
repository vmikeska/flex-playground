import { Component, OnInit } from '@angular/core';
import { maxBy } from 'lodash-es';
import { BehaviorSubject, Subject } from 'rxjs';

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
      styles: this.initItemStyles(nextNo),
      builtStyles: new BehaviorSubject<string>('')
    };

    item.styles.forEach((s) => {
      s.selectedChange.subscribe(() => {
        let styles = this.buildStyles(item.styles);
        item.builtStyles.next(styles);
      });

      s.valueChange.subscribe(() => {
        let styles = this.buildStyles(item.styles);
        item.builtStyles.next(styles);
      });
    })

    let styles = this.buildStyles(item.styles);
    item.builtStyles.next(styles);

    this.items.push(item);


  }

  private initItemStyles(no: number) {

    let opts = this.getItemOptions(no);

    let styles = opts.map((option) => {
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
    },
    {
      name: 'flex-wrap',
      defaultValue: 'nowrap',
      defaultSelected: true,
      options: [
        'nowrap',
        'wrap',
        'wrap-reverse'        
      ]
    },
    {
      name: 'justify-content',
      defaultValue: 'flex-start',
      defaultSelected: true,
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
        'start',
        'end',
        'left',
        'right',

        'flex-start safe',
        'flex-end safe',
        'center safe',
        'space-between safe',
        'space-around safe',
        'space-evenly safe',
        'start safe',
        'end safe',
        'left safe',
        'right safe',

        'flex-start unsafe',
        'flex-end unsafe',
        'center unsafe',
        'space-between unsafe',
        'space-around unsafe',
        'space-evenly unsafe',
        'start unsafe',
        'end unsafe',
        'left unsafe',
        'right unsafe'
      ]
    },
    {
      name: 'align-items',
      defaultValue: 'stretch',
      defaultSelected: true,
      options: [
        'stretch',
        'flex-start',
        'flex-end',
        'center',
        'baseline', 
        'first baseline', 
        'last baseline',
        'start',
        'end',                   
        'self-start',
        'self-end'
      ]
    },
    {
      name: 'align-content',
      defaultValue: 'normal',
      defaultSelected: true,
      options: [
        'normal',
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around', 
        'space-evenly', 
        'stretch', 
        'start', 
        'end', 
        'baseline', 
        'first baseline', 
        'last baseline'
      ]
    },

    //todo: check on options alternative sources


    //todo: what to do with flex flow ?

  ];

  private getItemOptions(no: number) {

    let itemOptions: ItemOption[] = [
      {
        name: 'background-color',
        defaultValue: this.colors[no - 1],
        options: this.colors,
        defaultSelected: true
      },
      {
        name: 'order',
        defaultValue: null,
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ],
        defaultSelected: false
      },
      {
        name: 'flex-grow',
        defaultValue: null,
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ],
        defaultSelected: false
      },
      {
        name: 'flex-shrink',
        defaultValue: null,
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ],
        defaultSelected: false
      },
      {
        name: 'flex-basis',
        defaultValue: null,
        options: ['auto'], //todo: custom values
        defaultSelected: false
      },
      //todo: FLEX shorthand
      {
        name: 'align-self',
        defaultValue: null,
        options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'], 
        defaultSelected: false
      },


      


      

      

    ];

    return itemOptions;
  }



  private colors = [
    'darkblue',
    'darkcyan',
    'darkgreen',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darkseagreen',
    'darkslateblue',
    'darkslategray'
  ]

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
  styles: ItemStyle[];
  builtStyles: BehaviorSubject<string>;
}

