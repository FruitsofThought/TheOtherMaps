/**
 * Copyright (c) 2016, Reinier Battenberg
 * All rights reserved.
 *
 * Source code can be found at:
 * https://github.com/FruitsofThought/TheOtherMaps
 *
 * @license GPL 3.0
 *
 *
 * @module TOMConfig
 *
 * @file Creates loads the configuration from the TOMApps home directory/config.yaml file
 * Also loads any language files present in the TOMApps lang folder and in the languages array in the config.
 */
"use strict"
define(['jquery', 'js-yaml', 'module'], function($, jsyaml, module) {
  var appconfig = Array();
  appconfig['languagefiles'] = [];
  var url = module.config().url;

  var configpromise = Promise.resolve({
    then: function(resolve, reject) {

      require(['yaml!' + url + 'config.yaml'], function(yaml) {
        console.log("HERE IS THE CONFIG", yaml);
        appconfig['appname'] = yaml.config.name;
        appconfig['map_start_location'] = yaml.config.map_start_location; // Amsterdam
        appconfig['startscene'] = yaml.config.startscene;
        appconfig['sceneslist'] = url + yaml.config.sceneslist;
        appconfig['languages'] = Array();
        appconfig['languages'][0] = window.navigator.userLanguage || window.navigator
          .language;
        appconfig['debug'] = yaml.config.debug;
        // loglevel of Tangram, also possible 'warn' or 'error'
        appconfig['logLevel'] = yaml.config.loglevel;
        appconfig['mapzenapikey'] = yaml.config.mapzenapikey;
        appconfig['basepath'] = module.config().basepath;
        var controls = new Object;
        /* This is documentation */
        controls.pleias = false;
        controls.zoom = false;
        controls.wms = false;
        if (typeof(yaml.config.controls) !== 'undefined') {
          var mycontrols = yaml.config.controls;
          appconfig['controls'] = $.merge(mycontrols, controls);
        } else {
          appconfig['controls'] = controls;
        }
        var i = 0;
        if (typeof yaml.config.languagefiles !== 'undefined') {
          while (i < yaml.config.languagefiles.length) {
            appconfig['languagefiles'][yaml.config.languagefiles[i]] = url + '/lang/' + yaml.config
              .languagefiles[
                i] + '.yaml';
            i++;
          }
        }
        resolve(appconfig);
      });
    }
  });

  return configpromise;
});
