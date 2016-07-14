"use strict";
define(['jquery', 'postal', 'config', 'jscookie'],
  function($, postal, config, Cookies) {

    class PermaLink {
      constructor() {
        this._channel = postal.channel();
        this.permalinkitems = [];
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
          var wikidataproperty = location.search.substring(2);
          var wikidatavalue = location.search.substring(3);
          this.permalinkitems = scene.split('&');
          var scene = this.permalinkitems[0];
        } else {
          var scene = config['startscene'];
          this.permalinkitems[0] = scene;
        }
        console.log("Permalink starts with current scene being ", scene);
        this._currentscene = this.permalinkitems[0];
        //        this._wikidataproperty = wikidataproperty;
        //      this._wikidatavalue = wikidatavalue;
        //        this.permalinkitems.push(scene, wikidataproperty, wikidatavalue);
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
            if (data.language != '') {
              if (Cookies.get('language') != data.language) {
                Cookies.set('language', data.language, {
                  expires: 365
                })
                me._setpermalink();
                location.reload();
              }
            }
          });
        this._wikidatasubscription = this._channel.subscribe(
          "wikidata.change",
          function(data) {
            me._wikidataproperty = data.wikidataproperty;
            me._wikidatavalue = data.wikidatavalue;
            me.permalinkitems[1] = data.wikidataproperty;
            me.permalinkitems[2] = data.wikidatavalue;
            me._setpermalink();
          });
      }
      get CurrentMapLocation() {
        return this._map_start_location;
      }

      get Scene() {
        return this.permalinkitems[0];
      }

      get WikidataProperty() {
        return this.permalinkitems[1];
      }

      get WikidataValue() {
        return this.permalinkitems[2];
      }

      set Scene(scene) {
        if (scene != '') {
          this._currentscene = scene;
          this.permalinkitems[0] = scene;
        }
        this._setpermalink();
      }

      _setpermalink() {
        var parts = location.href.split(/\/+/);
        var servername = parts[1];
        var url_hash = window.location.hash.slice(1, window.location.hash
          .length).split('/');
        var permalinkstring = this.permalinkitems.join('&');
        var permalink = location.pathname +
          "?" + permalinkstring + location.hash;
        history.replaceState(null, null, permalink);
      }
    };
    return new PermaLink();
  });
