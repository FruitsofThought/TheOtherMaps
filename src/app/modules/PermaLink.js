"use strict";
define(['jquery', 'postal', 'config', 'jscookie'],
  function($, postal, config, Cookies) {

    class PermaLink {
      constructor() {
        this._channel = postal.channel();

        console.log("Welcome to PermaLink");
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
        if (location.search.length > 1) {
          var scene = location.search.substring(1);
        } else {
          var scene = config['startscene'];
        }

        this._currentscene = scene;
        this._setpermalink();
        var me = this;
        this._scenessubscription = this._channel.subscribe(
          "scenes.change",
          function(data) {
            require(['permalink'], function(permalink) {
              permalink.Scene = data.scene.id;
            });
          });
        this._languagesubscription = this._channel.subscribe(
          "language.change",
          function(data) {
            me.Language = data.language;
          });
      }
      get CurrentMapLocation() {
        return this._map_start_location;
      }

      get Scene() {
        return this._currentscene;
      }

      set Language(lang) {
        if (lang != '') {
          if (Cookies.get('language') != lang) {
            this._setpermalink();
            location.reload();
          }
        }
      }

      set Scene(scene) {
        if (scene != '') {
          this._currentscene = scene;
        }
        this._setpermalink();
      }
      _setpermalink() {
        var parts = location.href.split(/\/+/);
        var servername = parts[1];
        var url_hash = window.location.hash.slice(1, window.location.hash
          .length).split('/');
        var permalink = location.pathname +
          "?" + this._currentscene + location.hash;
        history.replaceState(null, null, permalink);
      }
    };
    return new PermaLink();
  });
