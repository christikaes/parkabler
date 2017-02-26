import { style, animate, transition, state, trigger } from '@angular/core';

export default [
    trigger('stepperSlide', [
    state('active', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('previous', style({
      opacity: 0,
      display: 'none',
      position: 'absolute', bottom: 0, left: 0,
      transform: 'translate3d(-100%, 0, 0)',
      height: '100px' // HACK to animate height
    })),
    state('next', style({
      opacity: 0,
      display: 'none',
      position: 'absolute', bottom: 0, left: 0,
      transform: 'translate3d(100%, 0, 0)',
      height: '100px' // HACK to animate height
    })),
    state('inactive', style({
      display: 'none'
    })),
    transition('active => previous', animate('500ms ease-in-out')),
    transition('next => active', animate('500ms ease-in-out')),
    transition('active => next', animate('500ms ease-in-out')),
    transition('previous => active', animate('500ms ease-in-out')),
  ])
];
