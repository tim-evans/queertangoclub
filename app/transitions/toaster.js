import RSVP from 'rsvp';
import { animate, finish, stop, isAnimating } from "liquid-fire";

export default function toaster({ duration, easing }) {
  let firstStep;
  if (isAnimating(this.oldElement, 'moving-in')) {
    firstStep = finish(this.oldElement, 'moving-in');
  } else {
    stop(this.oldElement);
    firstStep = RSVP.resolve();
  }

  let width = biggestSize(this, 'width');
  if (this.oldElement) {
    this.oldElement.css('marginLeft', (width - this.oldElement.width()) / 2);
  }
  if (this.newElement) {
    this.newElement.css('marginLeft', (width - this.newElement.width()) / 2);
    this.newElement.css('visibility', 'hidden');
  }

  return firstStep.then(() => {
    let offset = biggestSize(this, 'height') + 40;
    return animate(this.oldElement, { top: offset * -1 }, { duration: duration, easing }).then(() => {
      let offset = biggestSize(this, 'height') + 40;
      if (this.newElement) {
        this.newElement.css('top', offset * -1);
      }
      return animate(this.newElement, { top: [0, offset * -1] }, { duration, easing }, 'moving-in');
    });
  });
}

function biggestSize(context, dimension) {
  var sizes = [];
  if (context.newElement) {
    sizes.push(parseInt(context.newElement.css(dimension), 10));
    sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
  }
  if (context.oldElement) {
    sizes.push(parseInt(context.oldElement.css(dimension), 10));
    sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
  }
  return Math.max.apply(null, sizes);
}
