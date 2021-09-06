import { BehaviorSubject, Subject } from "rxjs";

export class ItemStyle {
    public option: ItemOption;
  
    public valueChange = new Subject<string>();
    public customValueChange = new Subject<string>();
    public selectedChange = new Subject<boolean>();
  
    private _value: string;
    public get value() {
      return this._value;
    }
    public set value(v: string) {
      this._value = v;
      this.valueChange.next();
    }

    private _customValue: string;
    public get customValue() {
      return this._customValue;
    }
    public set customValue(v: string) {
      this._customValue = v;
      this.customValueChange.next();
    }
  
    private _selected: boolean;
    public get selected() {
      return this._selected;
    }
    public set selected(v: boolean) {
      this._selected = v;
      this.selectedChange.next();
    }

    public get isCustom() {
        return this.value === 'custom';
    }
  
  }
  
  export interface ItemOption {
    name: string;
    options: string[];
    defaultValue?: string;
    defaultCustomValue?: string;
    defaultSelected?: boolean;
    customValue?: boolean;
  }
  
  export interface FlexItem {
    no: number;
    styles: ItemStyle[];
    builtStyles: BehaviorSubject<string>;
  }
  