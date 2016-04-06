  function startdates_legend() {
    var html = '<table>';
    var startdates = getStartDateArray();
    var years = Object.keys(startdates);
    for (year of years) {
      html += '<tr><td>' + year + '</td><td><a style=\"background-color: ' + startdates[year] + ';display: block;\"></a><tr>';
    }
    html += '</table>';
    return html;
  };


function startdatecolor(feature) {
  // Set the years array as static
  if ( typeof startdatecolor.startdates == 'undefined' ) {
        // It has not... perform the initialization
        startdatecolor.startdates = getStartDateArray();
    }

                      if (!feature.hasOwnProperty('start_date')) {
                        return [1,1,1];
                      };
                      // In Amsterdam this seems to be the default.
                      if (feature.start_date == '1005') {
                        return [64,64,64];
                      };
                      var startdate = Date.parse(feature.start_date);
                      
                      var years = Object.keys(startdatecolor.startdates);
                      for (year of years) {
                        if (startdate < Date.parse(year)) { 
                          return startdatecolor.startdates[year];
                        }
                      }
                    }

                    
function getStartDateArray() {
//  var h= Math.floor((100 - val) * 120 / 100);
//  var s = Math.abs(val - 50)/50;
//  var v = 1;
  var yearslist = ['1100','1200','1400','1500', '1600', '1700', '1800', '1850', '1875', '1900', '1920', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2005', '2010', '2015', '2020'];

  return addcolourstoArray(yearslist);
}
/*
 * All learned from http://krazydad.com/tutorials/makecolors.php
 */
function addcolourstoArray(yearscolours) {
 var colours = makeColorGradient(.1, .1, .1, 1.5, 6.28, 3.14, 128, 127, yearscolours.length);
 
 return mergeArrays(yearscolours, colours);
}

function mergeArrays(arr1, arr2) {
    var l = Math.min(arr1.length,arr2.length), ret = [], i;
    for( i=0; i<l; i++) ret[arr1[i]] = arr2[i];
    return ret;
}

function makeColorGradient(frequency1, frequency2, frequency3,
  phase1, phase2, phase3,
  center, width, len) {
  if (center == undefined) center = 128;
  if (width == undefined) width = 127;
  if (len == undefined) len = 50;
  var result = new Array();

  for (var i = 0; i < len; ++i) {
    var red = Math.sin(frequency1 * i + phase1) * width + center;
    var grn = Math.sin(frequency2 * i + phase2) * width + center;
    var blu = Math.sin(frequency3 * i + phase3) * width + center;
    result.push(RGB2Color(red,grn,blu));
  }
  return result;
}

function RGB2Color(r, g, b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}


// Another way for red to green
var hsv2rgb = function(h, s, v) {
  // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};
