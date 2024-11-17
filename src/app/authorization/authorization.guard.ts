import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const toastr:ToastrService = inject(ToastrService);
  const token = localStorage.getItem('token');
  const router = new Router();

  if(token)
    {
      if(state.url.indexOf('admin')>=0)
          {
            let user:any = localStorage.getItem('user');
            user = JSON.parse(user);


            if(user.Roleid=='1')
            {              
              toastr.success('This page for admin');
              return true;
            }
              
            
            else 
            { 
              toastr.error('This page for admin');
              router.navigate(['security/login']);        
              return false;
            }

          }

        else if(state.url.indexOf('user')>=0)
            {
              let user:any = localStorage.getItem('user');
              user = JSON.parse(user);
              if(user.Roleid=='2')
                return true;           
              else 
              {
                toastr.error('This page for user ! Login to your Profile');
                router.navigate(['security/login']); 
                return false;
              }
            }

            else if(state.url.indexOf('userProfile')>=0)
              {
                let user:any = localStorage.getItem('user');
                user = JSON.parse(user);
                if(user.Roleid=='2' )
                  return true;           
                else 
                {
                  toastr.error('This page for user ! Login to your Profile');
                  router.navigate(['security/login']); 
                  return false;
                }
              }

              else if(state.url.indexOf('UserTrips')>=0)
                {
                  let user:any = localStorage.getItem('user');
                  user = JSON.parse(user);
                  if(user.Roleid=='2' || user.Roleid=='1')
                    return true;           
                  else 
                  {
                    toastr.error('This page for user ! Login to your Profile');
                    router.navigate(['security/login']); 
                    return false;
                  }
                }

          else if(state.url.indexOf('payment')>=0)
            {
              let user:any = localStorage.getItem('user');
              user = JSON.parse(user);
              if(user.Roleid=='2' || user.Roleid=='1')
                return true;           
              else 
              {
                toastr.error('just user can payment');
                router.navigate(['security/login']); 
                return false;
              }
            }

            else if(state.url.indexOf('AdminProfile')>=0)
              {
                let user:any = localStorage.getItem('user');
                user = JSON.parse(user);
                if( user.Roleid=='1')
                  return true;           
                else 
                {
                  toastr.error('This profile for Admin');
                  router.navigate(['security/login']); 
                  return false;
                }
              }

            else
                {
                  toastr.error('Login to your Profile');
                  router.navigate(['security/login']);
                  return false;
                }
    }

else  //token is null
{
  toastr.error('Login to your Profile');
  router.navigate(['security/login']); 
  return false;
}


};
