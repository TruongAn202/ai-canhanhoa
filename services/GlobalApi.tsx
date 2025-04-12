import axios from "axios";


//tach ra tu ham dang nhap google o trnag page cua auth(api)
export const GetAuthUserData=async(token:string)=>{
  try{
    const userInfo = await axios.get( //tai thu vien axios
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' +token } },
      );
      return userInfo.data;
  }catch(e){
    return e
  }
}