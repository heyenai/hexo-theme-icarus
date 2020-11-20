// 控制模板内容
module.exports = hexo => {
    // Hexo 路由控制
    hexo.extend.generator.register('blog_index', function(locals){
      const config = this.config;
      const amount = config.index_generator.amount ? config.index_generator.amount : 8;

      locals.posts = locals.posts.sort(config.index_generator.order_by || '-date').slice(0, amount);

      return {
        path: '/',
        data: locals,
        layout: 'blog_index'
      }
    });

    // 辅助函数
    hexo.extend.helper.register('blogcdn', function (option) {
        if (typeof option === 'string') {
            option = {
                filename: option
            }
        }

        let {
            cdn = 'https://cdn.jsdelivr.net/gh/${ repo }@${ version }/${ filename }',
            repo = 'repo',
            version = 'version',
            filename = 'filename'
        } = Object.assign(typeof this.config.blogcdn === 'object' ? this.config.blogcdn : {}, option);

        if (!filename || filename == '/') {
            return filename;
        }

        const full_url = RegExp("^((?:[a-z]+:)?\\/\\/|data:image\\/)", "i");
        if (full_url.test(filename)) {
            return filename
        }

        // const url_for = hexo.extend.helper.get('url_for').bind(this);
        // filename = url_for(filename);

        if (filename.startsWith('/')) {
            filename = filename.substr(1);
        }

        return cdn.replace(/\${\s*repo\s*}/gi, repo).replace(/\${\s*version\s*}/gi, version).replace(/\${\s*filename\s*}/gi, filename);
    });

};
