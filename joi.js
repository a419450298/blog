
const Joi = require('joi');

//定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).error(new Error('username属性没有通过验证')),

};



async function fun() {
    try {
        //实施验证
        await Joi.validate({username: 'a'}, schema);
    } catch(err) {
        console.log(err.message);
        return;
    }   
    console.log('验证通过')
}
fun();