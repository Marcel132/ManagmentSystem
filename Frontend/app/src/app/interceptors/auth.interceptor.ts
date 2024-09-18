import { HttpInterceptorFn } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap, throwError } from 'rxjs';

let reqCount = 0

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const excludedPaths = ['/login', '/signup'];

  const isExcludedPath = excludedPaths.some(path => req.url.includes(path));

  if (isExcludedPath) {
    return next(req);
  }


  
  const authTokenService = inject(AuthTokenService)
  const accessToken = sessionStorage.getItem("accessToken")


  const cloneReq = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  
  reqCount++
  console.log(`Ilość żądań: ${reqCount}`)

  return next(cloneReq).pipe(
    catchError((error) => {
      if(error.status === 403){
        console.log("Status 403")
        return authTokenService.refreshToken().pipe(
          switchMap((res: any) => {
            authTokenService.saveNewTokens(res.accessToken, res.refreshToken)
            
            const newRequest = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${res.accessToken}`
              }
            })

            return next(newRequest)

          }),
          catchError((refreshError)=>{
            console.log("Error: Cannot refresh token", refreshError)
            // sessionStorage.clear()
            return of(refreshError)
          })
        )
      }
      else {
        return throwError(error);
      }
    })
  );
};
