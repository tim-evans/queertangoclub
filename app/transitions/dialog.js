import Ember from 'ember';
import RSVP from 'rsvp';
import { animate } from "liquid-fire";

export default function dialog() {
  let duration = Ember.testing ? 0 : 200;
  let easing = 'ease-in-out';

  let oldBackground = this.oldElement.find('.dialog-background');
  let oldBox = this.oldElement.find('.dialog-container > *:last');

  let newBackground = this.newElement.find('.dialog-background');
  let newBox = this.newElement.find('.dialog-container > *:last');

  return RSVP.all([
    animate(newBox, { scale: [1, 0.97], opacity: 1 }, { duration, easing }),
    animate(oldBox, { scale: [0.95, 1], opacity: 0 }, { duration, easing }),
    animate(newBackground, { opacity: 0.5 }, { duration, easing }),
    animate(oldBackground, { opacity: 0 }, { duration, easing })
  ]).then(() => {
    if (newBox) {
      newBox.find('input:first').focus();
    }
  });
}
