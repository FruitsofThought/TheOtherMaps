define(['jquery', 'js-yaml'], function($, jsyaml) {
  var appconfig = Array();


  if (location.href.split(/\/+/)[1] == 'localhost') {
    appconfig['path'] = '/archtiles/TheOtherMaps/dist/'; // Should have trailing /
  } else {
    appconfig['path'] = '/'; // Should have trailing /
  }
  appconfig['filename'] = 'relief.html';
  appconfig['map_start_location'] = [33.9800, -118.1726, 11] // LA
  appconfig['startscene'] = 'reliefandredroads';
  appconfig['locationslist'] = 'scenes/locationsrelief.yaml';
  appconfig['sceneslist'] = 'scenes/sceneslistrelief.yaml'
  appconfig['debug'] = true;

  /**
   * Do not edit below this line
   */
  var jsonresult = fetchjson(appconfig['locationslist']);
  appconfig['locations'] = jsonresult;
  var jsonresult = fetchjson(appconfig['sceneslist']);
  appconfig['scenes'] = jsonresult.scenes;

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
