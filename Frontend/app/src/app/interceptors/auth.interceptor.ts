import { HttpInterceptorFn } from '@angular/common/http';

let reqCount = 0

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  reqCount++
  console.log(`Ilość żądań: ${reqCount}`)
  
  console.log(req.url)
  console.log(req.headers)
  return next(req);
};
