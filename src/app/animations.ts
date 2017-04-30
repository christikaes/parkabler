import { style, animate, transition, state, trigger } from '@angular/animations';

export default [
  trigger('slideLeft', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)',
      position: 'absolute', top: 0, left: 0,
    })),
    transition('void => *', [
      style({
        transform: 'translate3d(100%, 0, 0)',
        position: 'absolute', top: 0, left: 0,
      }),
      animate('600ms cubic-bezier(0.77, 0, 0.175, 1)')
    ]),
    transition('* => void', [
      animate(
        '600ms cubic-bezier(0.77, 0, 0.175, 1)',
        style({
          transform: 'translate3d(100%, 0, 0)',
          position: 'absolute', top: 0, left: 0,
        })
      )
    ])
  ]),
  trigger('slideRight', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)',
      position: 'absolute', top: 0, left: 0,
    })),
    transition('void => *', [
      style({
        transform: 'translate3d(-100%, 0, 0)',
        position: 'absolute', top: 0, left: 0,
      }),
      animate('600ms cubic-bezier(0.77, 0, 0.175, 1)')
    ]),
    transition('* => void', [
      animate(
        '600ms cubic-bezier(0.77, 0, 0.175, 1)',
        style({
          transform: 'translate3d(-100%, 0, 0)',
          position: 'absolute', top: 0, left: 0,
        })
      )
    ])
  ]),
  trigger('slideUp', [
    state('open', style({
      overflowY: 'hidden',
      maxHeight: '300px' // HACK
    })),
    state('closed', style({
      maxHeight: 0,
      overflowY: 'hidden'
    })),
    transition('open => closed', animate('600ms ease-out')),
    transition('closed => open', animate('600ms ease-in')),
  ])
];
