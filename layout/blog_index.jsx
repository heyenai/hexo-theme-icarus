const moment = require('moment');
const { Component, Fragment } = require('inferno');
const Paginator = require('hexo-component-inferno/lib/view/misc/paginator');
const ArticleMedia = require('hexo-component-inferno/lib/view/common/article_media');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { url_for, __, date_xml, date } = helper;

        const language = page.lang || page.language || config.language;

        function renderArticleList(posts, year, month = null) {
            const time = moment([page.year, page.month ? page.month - 1 : null].filter(i => i !== null));

            return <div class="card">
                <div class="card-content">
                    <h3 class="tag is-primary">{month === null ? year : time.locale(language).format('MMMM YYYY')}</h3>
                    <div class="timeline">
                        {posts.map(post => {
                            // const categories = post.categories.map(category => ({
                            //     url: url_for(category.path),
                            //     name: category.name
                            // }));
                            const categories = [];
                            return <ArticleMedia
                                url={url_for(post.link || post.path)}
                                title={post.title}
                                date={date(post.date, 'Mo Do')}
                                dateXml={date_xml(post.date)}
                                categories={categories}
                                thumbnail={post.thumbnail ? url_for(post.thumbnail) : null} />;
                        })}
                    </div>
                </div>
            </div>;
        }

        let articleList;
        if (!page.year) {
            const years = {};
            page.posts.each(p => { years[p.date.year()] = null; });
            articleList = Object.keys(years).sort((a, b) => b - a).map(year => {
                const posts = page.posts.filter(p => p.date.year() === parseInt(year, 10));
                return renderArticleList(posts, year, null);
            });
        } else {
            articleList = renderArticleList(page.posts, page.year, page.month);
        }

        return <Fragment>
            {articleList}
            <nav class="more">
                <a href={url_for('/archives')}>More&ensp;<i class="fa fa-angle-double-right"></i></a>
            </nav>
        </Fragment>;
    }
};
