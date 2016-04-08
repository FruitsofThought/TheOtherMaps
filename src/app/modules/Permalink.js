define(['jquery', 'postal', 'config'], function($, postal, config) {

  PermaLink = function() {
    this._basepath = config['path'];
    this._pagename = config['filename'];
    this._channel = postal.channel();

    // leaflet-style URL hash pattern:
    // #[zoom],[lat],[lng]
    var url_hash = window.location.hash.slice(1, window.location.hash.length)
      .split('/');
    this._map_start_location = config['map_start_location'];
    if (url_hash.length == 3) {
      this._map_start_location = [url_hash[1], url_hash[2], url_hash[0]];
      // convert from strings
      this._map_start_location = this._map_start_location.map(Number);
    }

    // If there is a filename.html?permalink
    if (location.href.includes('?')) {
      var subparts = location.href.split('?')[1];
      var parts = subparts.split(/\/+/);
      this._currentlanguage = parts[0];
      // cutoff the hash
      myparts = parts[1].split('#');
      this._currentscene = myparts[0];
      this._currentscene = myparts[0];
      //    this._pagename = parts[parts.length -3];
    } else {
      // there are clean URLs so basepath/permalink
      var parts = location.href.split(/\/+/);

      var counter = parts.length - this._basepath.split(/\/+/).length;
      // There is a filename, but there was no permalink yet
      if (parts[parts.length - 1].indexOf('.') > 0) {
        //    this._pagename = parts[parts.length -1];
      }
      // There was a permalink
      if (counter > 2) {
        this._currentlanguage = parts[counter + 2];
        myparts = parts[counter + 3].split('#');
        this._currentscene = myparts[0];
      } else {
        // TODO read cookie
        this._currentlanguage = window.navigator.userLanguage || window.navigator
          .language;;
        console.log('language = ' + this._currentlanguage);
        this._pagename = config['filename'];
        this._currentscene = config['startscene'];
        this._setpermalink();
      }
    }

    // broadcast the new language, which we just set. This will load the
    this._channel.publish("language.change", {
      language: this._currentlanguage,
    });
    // Now subscribe to that channel for future updates
    this._languagesubscription = this._channel.subscribe(
      "language.change",
      function(data) {
        require(['permalink'], function(permalink) {
          permalink.setLanguage(data.language);
        });
      });
    this._scenessubscription = this._channel.subscribe(
      "scenes.change",
      function(data) {
        this.setScene(data.scene);
      });

  };

  PermaLink.prototype = {

    _basepath: '',
    _currentscene: '',
    _currentlanguage: '',
    _pagename: '',
    _map_start_location: '',

    getCurrentMapLocation: function() {
      return this._map_start_location;
    },

    getCurrentLanguage: function() {
      return this._currentlanguage;
    },

    getCurrentScene: function() {
      return this._currentscene;
    },

    setLanguage: function(lang) {
      if (lang != '') {
        this._currentlanguage = lang;
      }
      this._setpermalink();
      location.reload();
    },

    setScene: function(scene) {
      if (scene != '') {
        this._currentscene = scene;
      }
      this._setpermalink();
    },

    _setpermalink: function() {
      var parts = location.href.split(/\/+/);
      var servername = parts[1];
      var url_hash = window.location.hash.slice(1, window.location.hash
        .length).split('/');
      if (this._pagename == '') {
        permalink = "http://" + servername + this._basepath + '/' +
          this._currentlanguage + '/' + this._currentscene + "#" +
          url_hash;
      } else {
        permalink = "http://" + servername + this._basepath + this._pagename +
          '?' + this._currentlanguage + '/' + this._currentscene + "#" +
          url_hash;
      }
      history.replaceState(null, null, permalink);
    },
  }
  return new PermaLink();
});
