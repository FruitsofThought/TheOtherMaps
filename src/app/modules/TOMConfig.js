define(['js-yaml', 'module'], function(jsyaml, module) {
  var appconfig = Array();
  appconfig['languagefiles'] = [];
  var url = module.config().url;

  var configpromise = Promise.resolve({
    then: function(resolve, reject) {

      require(['yaml!' + url + 'config.yaml?bust=1'], function(yaml) {
        console.log("HERE IS THE CONFIG")
        console.log(yaml);
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
        var i = 0;
        if (typeof yaml.config.languagefiles !== 'undefined') {
          while (i < yaml.config.languagefiles.length) {
            appconfig['languagefiles'][yaml.config.languagefiles[i]] = url + '/lang/' + yaml.config
              .languagefiles[
                i] + '.yaml?bust=1';
            i++;
          }
        }
        resolve(appconfig);

      });
    }
  });

  return configpromise;
});
