const express = require('express');
const admin = express.Router();
//管理页面登录
admin.get('/login', require('./admin/loginPage'));
admin.post('/login',require('./admin/login'));
//退出登录
admin.get('/logout',require('./admin/logout'));
//管理页面用户列表
admin.get('/user', require('./admin/userlist'))
//新增用户
admin.get('/user-edit', require('./admin/user-edit'));
admin.post('/user-edit', require('./admin/user-edit-fn'));
//修改用户
admin.post('/user-modify', require('./admin/user-modify'));
//删除用户
admin.post('/user-del', require('./admin/user-del'));
//文章列表管理
admin.get('/article', require('./admin/article'));
//发布文章
admin.get('/article-add', require('./admin/article-render'));
//添加文章
admin.post('/article-add', require('./admin/article-add'));
//修改文章
admin.post('/article-modify', require('./admin/article-modify'));
//删除文章
admin.post('/article-del', require('./admin/article-del'));
module.exports = admin;