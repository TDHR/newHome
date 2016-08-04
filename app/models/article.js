// mock data
function Article(opts) {
  if (!opts) opts = {};
  this.title = opts.title || 'title';
  this.url = opts.url || 'url';
  this.text = opts.text || 'text';
}

module.exports = Article;
