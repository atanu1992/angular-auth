import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}
  intercept(request, next) {
    // tslint:disable-next-line:prefer-const
    let authService = this.injector.get(AuthService);
    // tslint:disable-next-line:prefer-const
    let tokenizeRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizeRequest);
  }
}
