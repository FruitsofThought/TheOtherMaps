"use strict";
/**
 * @name SceneSwitcher
 * @class L.Control.SceneSwitcher
 * @extends L.Control
 * @param {string} id - The id of the switcher element (without the # character)
 * @param {Object} [options] - Optional options object
 * @see L.control.sceneswitcher
 */
L.Control.SceneSwitcher = L.Control.extend( /** @lends L.Control.SceneSwitcher.prototype */ {
  includes: L.Mixin.Events,

  _currentScene: '',

  _map: '',

  _channel: '',
  options: {
    scenes: {},
    currentScene: '',
    addTitle: false,
  },

  initialize: function(id, options) {
    this.options = options;
    this._ScenesList = options.scenes;
    this._currentScene = options.currentScene;
    this._channel = options.channel;
    this._createSwitcher(this);
    var me = this;
    this._scenessubscription = this._channel.subscribe(
      "scenes.change",
      function(data) {
        me.switchScene(data.scene.id);
      });
  },

  switchScene: function(sceneid, layer) {
    var switcher = this;
    var scene = this._ScenesList.list[sceneid];
    this._currentScene = sceneid;
    console.log("Going to set window title");
  },

  _createSwitcher: function() {
    if (window.self == window.top) {
      var eventFunction = this.switchScene;
      var scenes = this._ScenesList.list;
      this._buildSwitcher(scenes);
      return;
    }
  },

  _buildSwitcher: function() {
    console.log("buildSwitcher");
    var scenes = this._ScenesList.list;
    var currentScene = scenes[this._currentScene];
    require(['hbs!templates/sceneswitcher'], function(
      sceneSwitcherRenderer) {
      var groupedScenes = [];
      // Group the scenes by their groupid attribute
      Object.keys(scenes).forEach(function(key, index) {
        var scene = scenes[key];
        console.log("grouping scene" + scene.name);
        if (typeof groupedScenes[scene.groupid] ===
          "undefined") {
          groupedScenes[scene.groupid] = [];
        }
        var id = scene.id;
        groupedScenes[scene.groupid].push(scene);
      });
      var finalarray = [];
      finalarray['groups'] = [];
      finalarray['current'] = currentScene;
      var groups = [];
      // Add each group of scenes to a groups key as an object
      // too much magic in order to have handlebars iterate of the
      // groups and within the groups over the scenes
      Object.keys(groupedScenes).forEach(function(key, index) {
        console.log("Adding group" + key);
        finalarray['groups'].push(groupedScenes[key]);
      })
      var html = sceneSwitcherRenderer(finalarray);
      $('#sceneswitcher').html(html);
      // The template creates all items as inactive, so we activate the current scene
      $("#sceneswitcher #" + currentScene.id).toggleClass(
          "inactive")
        .toggleClass("active");

      // If Item clicked, scwitch scene
      $("#sceneswitcher li").click({}, function(event) {
        var sceneid = this.id;
        var element = this;
        require(["postal", "sceneslist", "promise!tomPolyglot"], function(postal,
          scenesList, Polyglot) {
          var scene = scenesList.getScene(sceneid);
          var channel = postal.channel();
          channel.publish("scenes.change", {
            scene: scene
          });
          $("#sceneswitcher .active").toggleClass(
            "active").toggleClass(
            "inactive");
          $("#sceneswitcher #" + scene.id).toggleClass(
            "inactive").toggleClass(
            "active");
          $("#currentscene .title").html($(element).find(
              'span.title').get(0)
            .innerText);
          $("#currentscene .description").html($(element).find(
            'span.description').get(0).innerText);
        });
      });
      require(['tipsy'], function() {
        $("#sceneswitcher li").tipsy({
          gravity: "e",
          fade: true
        });
      });

      $("#sceneswitcher liDAMAGED").hover(
        function() {
          $("#currentscene .title").html($(this).find(
              'span.title').get(0)
            .innerText);
          $("#currentscene .description").html($(this).find(
            'span.description').get(0).innerText);
          $("#currentscene").toggleClass("preview");
        },
        function() {
          // Find the current scene in HTML so we dont have to translate again
          $("#currentscene .title").html($(
            "#sceneswitcher .active .title").innerHTML);
          $("#currentscene .description").html($(
            "#sceneswitcher .active .description").innerHTML);
          $("#currentscene").toggleClass("preview");
        }
      );

    });

  },
  //  },


  /**
   * Add this sceneswitcher to the specified map.
   *
   * @param {L.Map} map
   * @returns {SceneSwitcher}
   */
  addTo: function(map) {
    var i, child;

    this._map = map;
    map.sceneSwitcherControl = this;

    return this;
  },
});

/**
 * Creates a new sceneswitcher.
 *
 * @example
 * var sceneswitcher = L.control.sceneswitcher('myswitcher').addTo(map);
 *
 * @param {string} id - The id of the sceneswitcher element (without the # character)
 * @param {Object} [options] - Optional options object
 * @returns {SceneSwitcher} A new sceneswitcher instance
 */
L.control.sceneswitcher = function(id, options) {
  return new L.Control.SceneSwitcher(id, options);
};
