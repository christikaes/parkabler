import { style, animate, transition, state, trigger } from '@angular/core';

export default [
  trigger('slideLeft', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate(400)
    ]),
    transition('* => void', [
      animate(0, style({transform: 'translateX(-100%)'}))
    ])
  ]),
  trigger('slideRight', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(400)
    ]),
    transition('* => void', [
      animate(0, style({transform: 'translateX(100%)'}))
    ])
  ])
];
