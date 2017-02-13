import config from './config/environment';

export default function () {
  let duration = config.environment === 'test' ? 0 : 150;
  let slow = config.environment === 'test' ? 0 : 600;
  let easing = 'ease-in-out';

  this.transition(
    this.hasClass('liquid-pop-over'),
    this.toValue(true),
    this.use('toolTip', { duration, easing }),
    this.reverse('toolTip', { duration, easing })
  );

  this.transition(
    this.childOf('.search-field'),
    this.toValue(true),
    this.use('fade', { duration }),
    this.reverse('fade', { duration })
  );

  this.transition(
    this.hasClass('snack-bar'),
    this.use('toaster', { duration: slow, easing: [600, 30] })
  );
}
