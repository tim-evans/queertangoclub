import Ember from 'ember';
import RSVP from 'rsvp';
import method from 'ember-service-methods/inject';

export default Ember.Service.extend({

  uploadPhoto: method(),

  flash: method(),

  execute (model, changes) {
    let attachments = [];
    model.eachRelationship(function (key, desc) {
      if (desc.type === 'photo') {
        attachments.push(desc);
      }
    });

    let uploadedFiles = [];
    RSVP.all(
      attachments.filterBy('kind', 'hasMany').filter(function ({ key }) {
        return changes.hasOwnProperty(key);
      }).map(({ key, options: { inverse } }) => {
        let changed = changes[key];
        delete changes[key];
        return RSVP.hash({
          old: model.get(key),
          changed
        }).then(({ old, changed }) => {
          let oldIds = old.mapBy('id');
          let newIds = changed.mapBy('id');

          return {
            destroy: old.filter(function (photo) {
              return newIds.indexOf(photo.get('id')) === -1;
            }),
            upload: changed.filter(function (photo) {
              return oldIds.indexOf(photo.get('id')) === -1;
            })
          };
        }).then(({ destroy, upload }) => {
          uploadedFiles = uploadedFiles.concat(upload.mapBy('name'));
          return RSVP.all([
            ...upload.map((file) => this.uploadPhoto(file, Object.assign({ [inverse]: model }, file.data))),
            ...destroy.invoke('destroyRecord')
          ]);
        });
      })
    ).then(() => {
      if (uploadedFiles.length) {
        let files = uploadedFiles.slice(0, Math.max(uploadedFiles.length - 2, 0)).join(', ');
        let lastFiles = uploadedFiles.slice(-2).join(' and ');
        if (files) {
          files = files + ', ' + lastFiles;
        } else {
          files = lastFiles;
        }

        if (uploadedFiles.length > 1) {
          this.flash(`${files} were uploaded.`, {
            timeout: 2500
          });
        } else {
          this.flash(`${files} was uploaded.`, {
            timeout: 2500
          });
        }
      }
    });

    return RSVP.all(
      attachments.filterBy('kind', 'belongsTo').filter(function ({ key }) {
        return changes.hasOwnProperty(key);
      }).map(({ key }) => {
        return model.get(key).then((old) => {
          let changed = changes[key];
          let photos = [];
          if (changed) {
            photos.push(this.uploadPhoto(changed, Object.assign({}, changed.data)));
            if (old) {
              photos.push(old.destroyRecord());
            }
          } else {
            photos.push(null);
            if (old) {
              photos.push(old.destroyRecord());
            }
          }
          return RSVP.all(photos);
        }).then(function ([photo]) {
          changes[key] = photo;
        });
      })
    ).then(() => {
      model.setProperties(changes);
      return model.save();
    });
  }
});
