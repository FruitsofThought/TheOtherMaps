define(['js-yaml', 'module'], function(jsyaml, module) {
  var appconfig = Array();

  var url = module.config().url;

  var configpromise = Promise.resolve({
    then: function(resolve, reject) {

      require(['yaml!' + url + 'config.yaml'], function(yaml) {
        console.log("HERE IS THE CONFIG")
        console.log(yaml);
        appconfig['map_start_location'] = yaml.config.map_start_location; // Amsterdam
        appconfig['startscene'] = yaml.config.startscene;
        appconfig['sceneslist'] = url + yaml.config.sceneslist;
        appconfig['languages'] = Array();
        appconfig['languages'][0] = window.navigator.userLanguage || window.navigator
          .language;
        appconfig['debug'] = yaml.config.debug;
        appconfig['logLevel'] = yaml.config.loglevel; // loglevel of Tangram, also possible 'warn' or 'error'
        appconfig['mapzenapikey'] = yaml.config.mapzenapikey;
        appconfig['basepath'] = module.config().basepath;
        resolve(appconfig);
      });
    }
  });

  return configpromise;
});
