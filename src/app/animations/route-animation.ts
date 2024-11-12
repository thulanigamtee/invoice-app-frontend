import { transition, trigger, style, animate} from '@angular/animations';

export const fadeIn = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ transform: 'translateX(-15px)', opacity: '0' }),
    animate(
      '500ms ease-in-out',
      style({ transform: 'translateX(0)', opacity: '1' })
    ),
  ]),
]);