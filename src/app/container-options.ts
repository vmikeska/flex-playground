import { ItemOption } from "./ints";

export class ContainerOptions {
    public static containerOptions: ItemOption[] = [
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
          defaultSelected: false,
          options: [
            'nowrap',
            'wrap',
            'wrap-reverse'        
          ]
        },
        {
          name: 'justify-content',
          defaultValue: 'flex-start',
          defaultSelected: false,
          options: [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
            // 'start',
            // 'end',
            // 'left',
            // 'right',
    
            'safe flex-start',
            'safe flex-end',
            'safe center',
            'safe space-between',
            'safe space-around',
            'safe space-evenly',
            // 'safe start',
            // 'safe end',
            // 'safe left',
            // 'safe right',
    
            'unsafe flex-start',
            'unsafe flex-end',
            'unsafe center',
            'unsafe space-between',
            'unsafe space-around',
            'unsafe space-evenly',
            // 'unsafe start',
            // 'unsafe end',
            // 'unsafe left',
            // 'unsafe right'
          ]
        },
        {
          name: 'align-items',
          defaultValue: 'stretch',
          defaultSelected: false,
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
          defaultSelected: false,
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
}