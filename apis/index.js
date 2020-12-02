import API from '@/utils/request.js';
export const Login = (params)=>API.get('tag-service/api/ectag/channel/list',params);
export const getUserInfo = (params)=>API.get('tag-service/api/ectag/channel/list',params);