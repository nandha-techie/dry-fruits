export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.access_token) {
      return "Bearer "+ user.access_token;
    } else {
      return "";
    }
  }

  export function email(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.email : "";
  }

  