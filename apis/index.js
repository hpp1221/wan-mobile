import API from '@/utils/request.js';
export const getCode = (params)=>API.post('/app/send/sms',params);
export const getLogin = (params)=>API.post('/app/user/login',params);