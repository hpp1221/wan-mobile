import API from '@/utils/request.js';
//验证码
export const getCode = (params)=>API.post('/app/send/sms',params);
//登录
export const getLogin = (params)=>API.post('/app/user/login',params);
//类目列表
export const getCategoryListApi= (params)=>API.post('/app/category/list',params);
//任务列表
export const getTaskListApi= (params)=>API.post('/app/task/list',params);
//任务详情
export const getTaskDetailApi= (params)=>API.post('/app/task/info',params);
//任务接单
export const taskOrderApi= (params)=>API.post('/app/order/receive',params);
//任务收藏
export const taskCollectApi= (params)=>API.post('/app/task/like',params);
//用户详情
export const getUserInfoApi= (params)=>API.post('/app/user/info',params);