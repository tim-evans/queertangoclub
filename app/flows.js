export function dropdown() {
  return this.orientCenter.andSnapTo(this.center).where(function (boundingRect) {
      return boundingRect.width < 500;
  }).then(this.orientBelow.andSnapTo(this.center, this.rightEdge, this.leftEdge));
}
