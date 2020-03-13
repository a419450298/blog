// 引用expess框架
const express = require('express');
//引入path模块
const path = require('path');
//引入body-parser模块
const bodyParser = require('body-parser');
//引入express-session
const session = require('express-session');
//导入art-template模板引擎
const template = require('art-template');
//导入dateformat第三方时间格式转换模块
const dateformat = require('dateformat');
//引入mongodb
require('./model/conn');
//创建网站服务器
const app = express();
//处理post请求
app.use(bodyParser.urlencoded({extended: false}));
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    //配置cookie过期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// 配置模板引擎 
//告诉express模板所在的位置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
//向模板内部导入dateFormat变量
template.defaults.imports.dateformat = dateformat;
// // 静态资源托管 
app.use(express.static(path.join(__dirname, 'public')));
// 引入路由模块
const home = require('./router/home');
const admin = require('./router/admin');
//拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));
// 为路由匹配请求路径
//博客前台
app.use('/home', home);
//博客后台
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next)=>{
    let result = JSON.parse(err);
    let arr = [];
    for(key in result){
        if(key != path){
            arr.push(key + '=' + result[key]);
        }
    }
    res.redirect(`${result.path}?${arr.join('&')}`);
});
//监听端口
app.listen(80,()=>{
    console.log('服务启动成功 run as http://localhost')
});