// 控制模板内容
module.exports = hexo => {
    // Hexo 路由控制
    hexo.extend.generator.register('blog_index', function(locals){
      return {
        path: 'index.html',
        data: locals,
        layout: 'archive'
      }
    });

    // 辅助函数
    // const url_for = this.url_for;

    // console.log(typeof url_for)
    hexo.extend.helper.register('blogcdn', function (filename) {
        const {
            cdn = 'https://cdn.jsdelivr.net/gh/${ repo }@${ version }/${ filename }',
            version,
            repo
        } = typeof this.config.blogcdn === 'object' ? this.config.blogcdn : {};

        if (!cdn || !filename || filename == '/') {
            return filename;
        }

        const full_url = RegExp("^((?:[a-z]+:)?\\/\\/|data:image\\/)", "i");
        if (full_url.test(filename)) {
            return filename
        }

        const url_for = hexo.extend.helper.get('url_for').bind(this);
        
        filename = url_for(filename);
        if (filename.startsWith('/')) {
            filename = filename.substr(1);
        }

        return cdn.replace(/\${\s*repo\s*}/gi, repo).replace(/\${\s*version\s*}/gi, version).replace(/\${\s*filename\s*}/gi, filename);
    });

};
