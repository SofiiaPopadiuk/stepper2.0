import { trigger, state, style, transition, animate } from "@angular/animations";

export const progressHorisontalAnimation = trigger('progressHorizontal', [
  state('active', style({
    background: '{{ color }}',
    width: '100%'
  }), { params: { color: '#22ECE9' }}),
  state('completed', style({
    background: '#202020'
  })),
  state('default', style({
    background: '#202020',
    width: 0
  })),
  transition('default <=> active', [
    animate('1500ms linear')
  ]),
  transition('active => completed', [
    animate('1500ms linear')
  ]),
])

export const progressVerticalAnimation = trigger('progressVertical', [
  state('active', style({
    background: '{{ color }}',
    height: '100%'
  }), { params: { color: '#22ECE9' }}),
  state('completed', style({
    background: '#202020'
  })),
  state('default', style({
    background: '#202020',
    height: 0
  })),
  transition('default <=> active', [
    animate('1500ms linear')
  ]),
  transition('active => completed', [
    animate('1500ms linear')
  ]),
])