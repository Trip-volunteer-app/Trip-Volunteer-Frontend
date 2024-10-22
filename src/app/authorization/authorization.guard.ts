import { CanActivateFn, Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = new Router();

  if(token){
    if(state.url.indexOf('admin')>=0)
      {
        let user:any = localStorage.getItem('user');
        user = JSON.parse(user);
        if(user.Roleid=='1')
          return true;
        else {
        
          return false;
        }

      }else if(state.url.indexOf('user')>=0){
        let user:any = localStorage.getItem('user');
        user = JSON.parse(user);
        if(user.Roleid=='2')
          return true;
        else {

          return false;}

      }else{
        return false;
      }

    }else{
    return false;
  }
};
