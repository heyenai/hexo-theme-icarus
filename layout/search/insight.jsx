const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');
const view = require('hexo-component-inferno/lib/core/view');
const Insight = view.require('hexo-component-inferno/lib/view/search/insight');

Insight.Cacheable = cacheComponent(Insight, 'search.insight', function (props) {
  var helper = props.helper;
  return {
    translation: {
      hint: helper.__('search.hint'),
      untitled: helper.__('search.untitled'),
      posts: helper._p('common.post', Infinity),
      pages: helper._p('common.page', Infinity),
      categories: helper._p('common.category', Infinity),
      tags: helper._p('common.tag', Infinity)
    },
    contentUrl: helper.url_for('/content.json'),
    jsUrl: helper.blogcdn(helper.url_for('/js/insight.js'))
  };
});
module.exports = Insight;
