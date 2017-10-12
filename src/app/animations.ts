import { style, animate, transition, state, trigger } from '@angular/animations';

export default [
  trigger('slideLeft', [
    transition(':enter', [
      style({
        transform: 'translate3d(100%, 0, 0)',
        position: 'absolute', top: 0, left: 0,
      }),
      animate('300ms cubic-bezier(0.77, 0, 0.175, 1)')
    ]),
    transition(':leave', [
      animate(
        '300ms cubic-bezier(0.77, 0, 0.175, 1)',
        style({
          transform: 'translate3d(100%, 0, 0)',
          position: 'absolute', top: 0, left: 0,
        })
      )
    ])
  ]),
  trigger('slideRight', [
    transition(':enter', [
      style({
        transform: 'translate3d(-100%, 0, 0)',
        position: 'absolute', top: 0, left: 0,
      }),
      animate('300ms cubic-bezier(0.77, 0, 0.175, 1)')
    ]),
    transition(':leave', [
      animate(
        '300ms cubic-bezier(0.77, 0, 0.175, 1)',
        style({
          transform: 'translate3d(-100%, 0, 0)',
          position: 'absolute', top: 0, left: 0,
        })
      )
    ])
  ]),
  trigger('slideUp', [
    state('open', style({
      maxHeight: '400px', // HACK
      overflowY: 'hidden'
    })),
    state('closed', style({
      maxHeight: 0,
      overflowY: 'hidden'
    })),
    state('peak', style({
      maxHeight: '35px',
      overflowY: 'hidden'
    })),
    transition('open => closed', animate('600ms ease-out')),
    transition('open => peak', animate('600ms ease-out')),
    transition('peak => closed', animate('600ms ease-out')),
    transition('closed => open', animate('600ms ease-in')),
    transition('closed => peak', animate('600ms ease-in')),
    transition('peak => open', animate('600ms ease-in')),
  ]),
  trigger('fade', [
    transition(
      ':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave', [
        style({ 'opacity': 1 }),
        animate('300ms', style({ opacity: 0 }))
      ]
    )
  ])
];
