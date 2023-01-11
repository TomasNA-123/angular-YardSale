import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function check_time(){
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TIME)){
      const start = performance.now();
      return next
      .handle(request)
      .pipe(
        tap(() => {
          const time = (performance.now() - start) + "ms";
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request)
  }
}