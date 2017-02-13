import RSVP from 'rsvp';
import { animate } from "liquid-fire";

export default function toolTip({ duration, easing }) {
  return RSVP.all([
    animate(this.newElement, { translateY: [0, 10], scale: [1, 0.95], opacity: 1 }, { duration, easing }),
    animate(this.oldElement, { translateY: [10, 0], scale: [0.96, 1], opacity: 0 }, { duration, easing })
  ]);
}
