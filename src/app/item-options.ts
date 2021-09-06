import { ItemOption } from "./ints";

export class ItemsOptions {
    public static getItemOptions(no: number) {

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
                options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',],
                defaultSelected: false
            },
            {
                name: 'flex-grow',
                defaultValue: null,
                options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',],
                defaultSelected: false
            },
            {
                name: 'flex-shrink',
                defaultValue: null,
                options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',],
                defaultSelected: false
            },
            {
                name: 'flex-basis',
                defaultValue: null,
                options: ['auto'], //todo: custom values
                defaultSelected: false,
                customValue: true
            },
            //todo: FLEX shorthand
            {
                name: 'align-self',
                defaultValue: null,
                options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
                defaultSelected: false
            },
            {
                name: 'width',
                defaultValue: 'custom',
                options: ['auto'],
                defaultSelected: true,
                customValue: true,
                defaultCustomValue: '200px'
            },            
            {
                name: 'height',
                defaultValue: 'custom',                
                options: ['auto'],
                defaultSelected: true,
                customValue: true,                
                defaultCustomValue: '400px'
            },

        ];

        return itemOptions;
    }


    private static colors = [
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