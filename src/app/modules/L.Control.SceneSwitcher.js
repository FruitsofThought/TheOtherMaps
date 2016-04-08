/**
 * @name SceneSwitcher
 * @class L.Control.SceneSwitcher
 * @extends L.Control
 * @param {string} id - The id of the switcher element (without the # character)
 * @param {Object} [options] - Optional options object
 * @see L.control.sceneswitcher
 */
L.Control.SceneSwitcher = L.Control.extend( /** @lends L.Control.SceneSwitcher.prototype */ {
  includes: L.Mixin.Events,

  _currentStyle: '',

  _map: '',

  _permaLink: '',

  options: {
    styles: {},
    currentStyle: '',
    addTitle: false,
  },

  initialize: function(id, options) {
    this.options = options;
    this._currentStyle = options.currentStyle;
    this._permaLink = options.permaLink;
    this._createSwitcher(this);
  },

  switchStyles: function(style, layer) {
    var switcher = this;
    // only really switch scene when necessary
    if ((this.options.styles[style]) && (style != this._currentStyle)) {
      this._currentStyle = style;

      //TODO: Remove the dependency on window
      window.layer.scene.reload(this.options.styles[this._currentStyle].file);
      if (this.options.styles[this._currentStyle].sources != null) {
        keys = Object.keys(this.options.styles[this._currentStyle].sources);
        for (mykey of keys) {
          source = this.options.styles[this._currentStyle].sources[mykey];
          window.layer.scene.setDataSource(mykey, source);
        }
        window.layer.scene.requestRedraw();
      }
    }
    // Do the rest always, so it is done also when called from addTo
    document.title = this.options.styles[this._currentStyle].name +
      ' | The Other Maps Project';
    // is there a legend function
    var legendfunction = this.options.styles[style].legendfunction;
    var scripts = this.options.styles[style].scripts;
    if (legendfunction != null) {
      console.log("We expect a legend: " + legendfunction);
      // is the legend function loaded, or do we need to load the javascript for it
      if (window[legendfunction] == null) {
        console.log("its not there yet");
        if (scripts != null) {
          console.log("Add scripts");
          scripts.forEach(function(filename) {
            var server = location.origin;
            var path = location.pathname.substr(0, location.pathname.lastIndexOf(
              "/"));
            filename = server + path + '/' + filename;
            console.log("Loading Script for " + filename);
            $.getScript(filename, function() {
              console.log("Loaded Script for " + legendfunction);
              if (window[legendfunction] != null) {
                buildlegend(legendfunction);
              }
            });
          });
        }
      } else {
        buildlegend(legendfunction);
      }
    }
    if (window[legendfunction] == null) {
      $('#legend').html('');
      switcher._map.sidebarcontrols['rightsidebar'].disable(
        'legendpane');
    }
    this._permaLink.setScene(style);

    function buildlegend(legendfunction) {
      console.log("Adding Legend old school");
      require(['globalpolyglot'], function(Polyglot) {
        var polyglot = Polyglot();
        var legend = window[legendfunction]();
        var html = '<table>';
        legend.forEach(function(item) {
          html += '<tr><td>' + polyglot.t(item.title);
          html += '</td><td><a style=\"background-color: ' + item
            .color
          html += ';display: block;\" title=\"' + polyglot.t(item
            .description)
          html += '\"></a><tr>';
        });
        html += '</table>';
        $('#legend').html(html);
        switcher._map.sidebarcontrols['rightsidebar'].enable(
          'legendpane');
      });
    }
  },

  getCurrentStyle: function() {
    return this._currentStyle;
  },

  getCurrentTemplate: function() {
    return this.options.styles[this._currentStyle].labelmst;
  },

  _createSwitcher: function() {
    if (window.self == window.top) {
      var eventFunction = this.switchStyles;
      var styles = this.options.styles
      var keys = Object.keys(this.options.styles);
      var width = 0;
      var switcher = this;
      var currentStyle = this.getCurrentStyle();
      var switcherEL = document.createElement('div');
      switcherEL.className = "control";
      var stylesUL = document.createElement('ul');

      if (this.options.addTitle) {
        var titleLI = document.createElement('li');
        var titleTxt = document.createTextNode('styles');
        titleLI.appendChild(titleTxt);
        titleLI.className = 'title';
        styleUL.appendChild(titleLI);

        titleLI.addEventListener('click', function(e) {
          titleLI.classList.toggle('active');
          var style = document.querySelectorAll('li.style');
          var len = style.length;
          var i = 0;
          for (i = 0; i < len; i++) {
            style[i].classList.toggle('show');
          }
        });
      }
      var curGroup = '';
      var groupUL = document.createElement('ul');
      keys.forEach(function(styleKey, index) {
        var styleGroup = styles[styleKey].group;
        if (styleGroup != curGroup) {
          if (groupUL.children.length > 0) {
            //          stylesUL.appendChild(groupUL);
            switcherEL.appendChild(groupUL);
            groupUL = document.createElement('ul');
          }
          //var groupLI = document.createElement('li');
          var groupTxt = document.createTextNode(styles[styleKey].group);
          groupUL.appendChild(groupTxt);
          groupUL.className = 'group';
          //groupUL.appendChild(groupLI)
          curGroup = styleGroup;
        }
        var styleLI = document.createElement('li');
        var styleTxt = document.createTextNode(styles[styleKey].name);
        styleLI.appendChild(styleTxt);
        styleLI.className = 'style';
        styleLI.setAttribute("id", styleKey);
        if (styleKey == currentStyle) {
          styleLI.classList.add('active');
        }
        styleLI.style.cssText = 'top: ' + ((index + 1) * 48) + 'px';
        styleLI.addEventListener('click', function(e) {
          switcher.switchStyles(styleKey);
          removeActiveClass();
          styleLI.classList.add('active');
        });
        groupUL.appendChild(styleLI);
        switcherEL.appendChild(groupUL);
      });
      //    stylesUL.appendChild(groupUL);
      //    switcherEL.appendChild(stylesUL);
      switcherEL.appendChild(groupUL);
      $('#sceneswitcher').append(switcherEL);
    }
    /*
     *     params.forEach(function(styleName,index){
          var styleLI = document.createElement('li');
          var styleTxt = document.createTextNode(styleName);
          styleLI.appendChild(styleTxt);
          styleLI.className = 'style';
          if(styleName == cStyle){
            styleLI.classList.add('active');
          }
          styleLI.style.cssText = 'top: ' + ((index+1) * 48) + 'px';
          styleLI.addEventListener('click',function(e){
            func(styleName);
            removeActiveClass();
            styleLI.classList.add('active');
          });
          styleUL.appendChild(styleLI);
        });
        switcherEL.appendChild(styleUL);
        document.body.appendChild(switcherEL);
      }*/
    function removeActiveClass() {
      var style = document.querySelectorAll('li.style');
      var len = style.length;
      var i = 0;
      for (i = 0; i < len; i++) {
        style[i].classList.remove('active');
      }
    }
  },


  /**
   * Add this sceneswitcher to the specified map.
   *
   * @param {L.Map} map
   * @returns {SceneSwitcher}
   */
  addTo: function(map) {
    var i, child;

    this._map = map;
    map.sceneSwitcherControl = this;
    //Rather do this by calling
    this.switchStyles(this._currentStyle);
    // Add the legend
    /* if ((this.options.styles[this._currentStyle].legendfunction != null) && (window[this.options.styles[this._currentStyle].legendfunction] != null)){
       $('#legend').html(window[this.options.styles[this._currentStyle].legendfunction]());
       map.sidebarcontrols['sidebar'].enable('legendpane');
     } else {
       $('#legend').html('');
       map.sidebarcontrols['sidebar'].disable('legendpane');
     }*/

    return this;
  },
});

/**
 * Creates a new sceneswitcher.
 *
 * @example
 * var sceneswitcher = L.control.sceneswitcher('myswitcher').addTo(map);
 *
 * @param {string} id - The id of the sceneswitcher element (without the # character)
 * @param {Object} [options] - Optional options object
 * @returns {SceneSwitcher} A new sceneswitcher instance
 */
L.control.sceneswitcher = function(id, options) {
  return new L.Control.SceneSwitcher(id, options);
};
