define(['jquery', 'js-yaml'], function($, jsyaml) {
  var appconfig = Array();

  //  var server = location.origin;
  //  var path = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
  //  appconfig['path'] = path + '/'; // Should have trailing /

  //  appconfig['filename'] = 'develop.html';
  appconfig['map_start_location'] = [52.3697, 4.9044, 15] // Amsterdam
  appconfig['startscene'] = 'TOMBuildingMaterial';
  //appconfig['locationslist'] = 'scenes/locationsall.yaml';
  appconfig['sceneslist'] = 'scenes/sceneslistlocal.yaml';
  appconfig['languages'] = Array();
  appconfig['languages'][0] = window.navigator.userLanguage || window.navigator
    .language;
  appconfig['debug'] = true;
  appconfig['logLevel'] = 'warn'; // loglevel of Tangram, also possible 'warn' or 'error'
  appconfig['mapzenapikey'] = 'vector-tiles-KXs7X8B';

  /**
   * Do not edit below this line
   */
  //var jsonresult = fetchjson(appconfig['locationslist']);
  //appconfig['locations'] = jsonresult;

  function fetchjson(url) {
    if (appconfig['debug']) {
      url += "?" + "bust=v73" + (new Date()).getTime();
    }
    console.log('going to fetch ' + url);
    var result;
    // using synchronous ajax to load the json. can not use requirejs for that (and this is bad, too)
    $.ajax({
      url: url,
      async: false,
      cache: (appconfig['debug']),
      success: function(data) {
        result = jsyaml.load(data);
      },
      error: function(state, err, bigerr) {
        console.log(err + ' ' + bigerr.message);
        console.log("Cant load scenes or locations!?");
      }
    });

    return result;
  }

  return appconfig;
});
