"use strict";
define(['promised!require',
    'jquery',
    'js-yaml',
    'promise!config',
    //  'yaml'
  ],
  function(require, $, jsyaml, config) {
    // |There are several ways to (not) return a promise for an
    // object that needs to do asynchronous stuff after it is being
    // created.
    // I chose the least popular of the 2 alternatives listed here
    // http://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise
    // because i like the users of my class to not see anything of what happens
    // on the inside.

    // lets try again:

    // this file returns a promise
    // the resolve of this promise is an array of promisses
    // if all of those promisses have been met, we can start asking questions

    class ScenesList {
      constructor(sceneslistyaml) {
        this.scenefiles = [];
        this.listofscenes = [];
        this.scenepromises = [];
        var engine = this;
        this.sceneslistyaml = sceneslistyaml;

        engine.listpromise = Promise.resolve({
            then: function(resolve, reject) {
              // do async stuff
              var loadlist = sceneslistyaml;
              if (config.debug) {
                loadlist += "?bust=" + (new Date()).getTime();
              }
              console.log("Loading Scenes from " + loadlist);
              var result;
              require(['yaml!' + loadlist], function(yaml) {
                resolve(yaml);
              });
            }
          })
          .then(function(result) {
            var list = {};
            var file = '';
            var fullfile = '';
            var list = [];
            for (file of result.scenesList) {
              console.log("Scene File: " + file.file);
              engine.scenefiles.push(file.file);
            }
            console.log("Scenes to be loaded ", engine.scenefiles);
            var filepromise = require(engine.scenefiles);
            return (filepromise);
          })
          .then(function(scenes) {
            console.log("Scenes Loaded");
            var arrayLength = scenes.length;
            var sceneloadedpromises = [];
            for (var i = 0; i < arrayLength; i++) {
              engine.listofscenes[scenes[i].id] = scenes[i];
            };
            return engine;
          });
      }
      get Initialized() {
        var engine = this;
        console.log("Retrieving the Initialized");
        return Promise.resolve(engine.listpromise);
      }
      get list() {
        console.log("get SceneList List ");
        var engine = this;
        console.log("Promised SceneList List success ", engine.listofscenes);
        return engine.listofscenes;
      }
      set list(value) {
        this.listofscenes = value;
      }
      getScene(sceneid) {
        var engine = this;
        console.log('getScene', sceneid);
        console.log('getScene List', engine.listofscenes);
        var scene = engine.listofscenes[sceneid];
        return scene;
      }
    }

    var local = new ScenesList(config['sceneslist']);
    return Promise.resolve(local.Initialized);

  });
