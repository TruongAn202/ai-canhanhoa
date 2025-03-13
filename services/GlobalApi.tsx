import axios from "axios";


//tach ra tu ham dang nhap google o trnag page cua auth
export const GetAuthUserData=async(token:string)=>{
    const userInfo = await axios.get( //tai thu vien axios
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer' +token } },
      );
      return userInfo.data;
}