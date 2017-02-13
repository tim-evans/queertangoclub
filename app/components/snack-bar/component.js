import Ember from 'ember';
import $ from 'jquery';

const { get, inject: { service }, run: { bind }, observer } = Ember;

export default Ember.Component.extend({

  flash: service(),

  session: service(),

  stick: observer('session.currentUser', function () {
    let top = Math.max($('.admin').height() - $(window).scrollTop(), 0) + 20;
    this.$('.snack-bar').css({ top });
  }),

  didInsertElement() {
    this._stick = bind(this, 'stick');
    $(window).on('scroll', this._stick);
    this.stick();
  },

  willDestroyElement() {
    $(window).off('scroll', this._stick);
  },

  actions: {
    throw() {
      get(this, 'flash.message.reject')();
    }
  }
});
