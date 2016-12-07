define('templates/helpers/getosmkeyvalue', ['handlebars'], function(
  Handlebars) {
  function getosmkeyvalue(context, options) {
    var wikiproperty;
    var optionsarray = context.split('.');
    var key;
    var value = options.data._parent.root.keyvalues;
    var arrayLength = optionsarray.length;


    for (var i = 0; i < arrayLength; i++) {
      value = value[optionsarray[i]];
      if (typeof value == 'undefined') {
        console.error("There is no OSMKeyValue defined for " + context);
        return "";
      }
      // this trick sets the last parents wikiproperty
      // so if your parent is P149 and you do not have a
      // property set, then we will add your parents property
      if (typeof value.wikiproperty !== 'undefined') {
        wikiproperty = value.wikiproperty;
      }
    }
    if ((typeof value.wikiproperty == 'undefined') && (typeof value.wikidata !== 'undefined')) {
      value.wikiproperty = wikiproperty;
    }

    return value;
  }
  Handlebars.registerHelper('getosmkeyvalue', getosmkeyvalue);
  return getosmkeyvalue;
});
