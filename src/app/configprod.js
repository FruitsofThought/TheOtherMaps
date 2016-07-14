define(['jquery', 'js-yaml'], function($, jsyaml) {
  var appconfig = Array();
  var server = location.origin;
  var path = location.pathname.substr(0, location.pathname.lastIndexOf("/"));
  appconfig['path'] = path + '/';
  appconfig['filename'] = 'index.html';
  appconfig['map_start_location'] = [-6.1652, 39.2021, 15]; //Ng'Ambo   [52.3697, 4.9044, 15, 16] // Amsterdam
  appconfig['startscene'] = 'TOMArchitecturalStyles';
  appconfig['locationslist'] = 'scenes/locations.yaml';
  appconfig['sceneslist'] = 'scenes/sceneslistnew.yaml'
  appconfig['debug'] = false;

  /**
   * Do not edit below this line
   */
  var jsonresult = fetchjson(appconfig['locationslist']);
  appconfig['locations'] = jsonresult;

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
