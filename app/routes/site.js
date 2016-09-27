var site = require('./../controllers/site');

module.exports = function(app, auth) {
  // 首页
  app.get('/', site.index);

  // 核心价值
  app.get('/values', site.values);

  // 服务
  app.get('/service', site.service);

  // 团队
  app.get('/team', site.team);

  // 知识库
  app.get('/knowledge/:pageNumber?', site.knowledge);

  // 联系我们
  app.get('/contact', site.contact);

  // 服务条款
  app.get('/terms', site.terms);

  // 获取文章
  app.get('/articles', site.articles);

  // 文章内容
  app.get('/knowledge/article/:articleID', site.article);
};