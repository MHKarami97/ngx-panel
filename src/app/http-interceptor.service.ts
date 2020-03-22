import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: NbAuthService, private router: Router, private toastrService: NbToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const baseUrl = 'https://localhost:44339/api/v1/';

    req.clone({
      url: baseUrl + req.url,
    });

    // if (req.method !== 'GET' && req.url.includes('/user/')) {

    // }

    const config = {
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };

    req = this.addJsonHeader(req);
    req = this.addAuthenticationToken(req);

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 201) {
        this.toastrService.show(
          'متاسفانه برنامه با خطا مواجه شد',
          'خطا',
          config);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['auth/login']);
          this.toastrService.show(
            'توکن شما منقضی شده است',
            'هشدار',
            config);
        } else if (err.status === 400) {
          this.router.navigate(['auth/login']);
          this.toastrService.show(
            'متاسفانه برنامه با خطا مواجه شد',
            'خطا',
            config);
        } else if (err.status === 500) {
          this.router.navigate(['auth/login']);
          this.toastrService.show(
            'متاسفانه برنامه با خطا مواجه شد',
            'خطا',
            config);
        } else if (err.status === 501) {
          this.router.navigate(['auth/login']);
          this.toastrService.show(
            'متاسفانه برنامه با خطا مواجه شد',
            'خطا',
            config);
        }
      }
    });
  }

  private addJsonHeader(request: HttpRequest<any>): HttpRequest<any> {

    if (request.headers.has('Content-Type')) {
      return;
    }

    return request.clone({
      headers: request.headers.append('Content-Type', 'application/json'),
    });
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.authService.isAuthenticated()) {
      return request;
    }

    return request.clone({
      headers: request.headers.append('Authorization', `Bearer ${this.authService.getToken()}`),
    });
  }
}
