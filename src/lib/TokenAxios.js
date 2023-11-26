import axios from 'axios';

export const TokenAxios = axios.create({
    baseURL: `${process.env.REACT_APP_GATEWAY_URL}`, // 게이트웨이 주소
    headers: {
        AccessToken: localStorage.getItem('accessToken'),
        RefreshToken : localStorage.getItem('refreshToken'),
    },
  });