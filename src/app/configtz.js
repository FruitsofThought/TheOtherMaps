define (['jquery', 'js-yaml'], function ($, jsyaml) {
  var appconfig = Array();
  appconfig['path'] = '/';
  appconfig['filename'] = 'tanzania.html';
  appconfig['map_start_location'] = [-6.1653329612873105, 39.19835239648819, 16] // Ngambo
  appconfig['startscene'] = 'architecturalstylestz';
  appconfig['locationslist'] = 'scenes/locationstz.yaml';
  appconfig['sceneslist'] = 'scenes/sceneslisttz.yaml'
  appconfig['debug'] = false;

    /**
      * Do not edit below this line
      */
    var jsonresult = fetchjson(appconfig['locationslist']);
    appconfig['locations'] = jsonresult.locationsList.slice(0);
    var jsonresult = fetchjson(appconfig['sceneslist']);
    appconfig['scenes'] = jsonresult.scenes;

    function fetchjson(url) {
      if (appconfig['debug']) {
        url+="?"+"bust=v73"+ (new Date()).getTime();
      }
      console.log ('going to fetch ' + url);
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
          console.log (err+' '+bigerr.message);
          console.log ("Cant load scenes or locations!?");
        }
      });

      return result;
    }

    return appconfig;
  });
