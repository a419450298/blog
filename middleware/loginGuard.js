module.exports = (req,res,next)=>{
    //判断请求方式 如果是get请求就判断，如果不是就放行
    if(req.method == 'GET'){
        //判断用户访问的是否是登录页面
        //判断用户的登录状态
        //如果是用户登录 将请求放行
        //如果不是登录的 将请求重定向到登陆页面
        if(req.url != '/login' && !req.session.userId) {
            res.redirect('/admin/login')
        } else {
            //通过session判断用户角色，如果是普通用户就跳转到博客前台页面
            if(req.session.role == 'normal'){
                return res.redirect('/home/')
            }
            next();
        }
    }else if(req.method == 'POST'){
        next();
    }
}