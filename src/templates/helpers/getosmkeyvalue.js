define('templates/helpers/getosmkeyvalue', ['handlebars'], function(
  Handlebars) {
  function getosmkeyvalue(context, options) {
    /*    console.log(
          'This : ', this);
        console.log(
          'Context : ', context
        );
        console.log(
          'Options : ', options);
    */
    var wikiproperty;
    var optionsarray = context.split('.');
    var key;
    var value = options.data._parent.root.keyvalues;
    console.log("value  ", value);
    var arrayLength = optionsarray.length;


    for (var i = 0; i < arrayLength; i++) {
      value = value[optionsarray[i]];
      console.log("at key " + i, value);
      if (typeof value == 'undefined') {
        console.error("There is no OSMKeyValue defined for " + context);
        return "";
      }
      // this trick sets the last parents wikiproperty
      // so if your parent is P149 and you do not have a
      //property set, then we will add your parents property
      if (typeof value.wikiproperty !== 'undefined') {
        wikiproperty = value.wikiproperty;
      }
    }
    if ((typeof value.wikiproperty == 'undefined') && (typeof value.wikidata !== 'undefined')) {
      value.wikiproperty = wikiproperty;
    }
    console.log("returning ", value);

    return value;
  }
  Handlebars.registerHelper('getosmkeyvalue', getosmkeyvalue);
  return getosmkeyvalue;
});
