import config from './config/environment';

export default function () {
  let duration = config.environment === 'test' ? 0 : 150;
  this.transition(
    this.hasClass('liquid-pop-over'),
    this.toValue(true),
    this.use('fade', { duration }),
    this.reverse('fade', { duration })
  );

  this.transition(
    this.childOf('.search-field'),
    this.toValue(true),
    this.use('fade', { duration }),
    this.reverse('fade', { duration })
  );
}
