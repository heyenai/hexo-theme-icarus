const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');
const view = require('hexo-component-inferno/lib/core/view');
const WebApp = view.require('hexo-component-inferno/lib/view/misc/web_app');

WebApp.Cacheable = cacheComponent(WebApp, 'misc.webapp', function (props) {
  var name = props.name,
      themeColor = props.themeColor,
      favicon = props.favicon,
      icons = props.icons,
      helper = props.helper;
  var tileIcon = null;

  if (Array.isArray(icons)) {
    tileIcon = icons.find(function (icon) {
      return icon.sizes.toLowerCase().indexOf('144x144') > -1;
    });

    if (tileIcon) {
      tileIcon = tileIcon.src;
    } else if (icons.length) {
      tileIcon = icons[0].src;
    }
  }

  if (!tileIcon) {
    tileIcon = favicon;
  }

  return {
    name: name,
    icons: icons,
    tileIcon: tileIcon,
    themeColor: themeColor,
    manifest: helper.blogcdn(helper.url_for('/manifest.json'))
  };
});
module.exports = WebApp;
