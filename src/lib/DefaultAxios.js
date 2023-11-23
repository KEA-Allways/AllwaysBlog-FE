import axios from 'axios';

export const DefaultAxios = axios.create({
    baseURL: `${process.env.REACT_APP_GATEWAY_URL}`, // 게이트웨이 주소
});