import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
   
    
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    return next.handle(request).pipe(
      catchError((err) => {
        //console.log(err);
        const errorMessage = this.getErrorMessage(err);
        switch (err instanceof HttpErrorResponse && err.status) {
          case 401:
              debugger;
            this.handle401Error(request, next);
          case 404:
            this.handle400Error(err);        
          case 0:
            this.handle400Error(err);
          // dafault: this.handle400Error(err);
        }

        return throwError(errorMessage || 'Server Error !');
      })
    );
  }

  handle400Error(error) {
    // waiting for refresh token service ;
    // throw error;
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
      console.log('req',req)
      if (window.location.hash && !localStorage.getItem('authorizationData')) {
        this.AuthorizedCallback();
      }else{
        this. Authorize()
      }
 
  }
  public AuthorizedCallback() {
    debugger;
    
    let hash = window.location.hash.substr(1);

    let result: any = hash
      .split('&')
      .reduce(function (result: any, item: string) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});

    console.log(result);

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {
      if (result.state !== localStorage.getItem('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {
        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== localStorage.getItem('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          localStorage.setItem('authNonce', '');
          localStorage.setItem('authStateControl', '');

          authResponseIsValid = true;

          this.SetAuthorizationData(token, id_token);
         
          console.log(
            'AuthorizedCallback state and nonce validated, returning access token'
          );
          window.location.href =window.location.origin + '/home'
        }
      }
    }
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];

      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }

  public SetAuthorizationData(token: any, id_token: any) {
    if (localStorage.getItem('authorizationData') !== '') {
      localStorage.setItem('authorizationData', '');
    }

    localStorage.setItem('authorizationData', token);
    localStorage.setItem('authorizationDataIdToken', id_token);

   

    localStorage.setItem('IsAuthorized', 'true');
  }
   Authorize() {
    debugger;
    
    localStorage.removeItem('authorizationData');
    let authorizationUrl = environment.mainURL + '/connect/authorize';
    let client_id = 'js';
    let redirect_uri = location.origin + '/home';
    let response_type = 'id_token token';
    let scope = 'openid profile dashboards dashboards.signalrhub';
    let nonce = 'N' + Math.random() + '' + Date.now();
    let state = Date.now() + '' + Math.random();

    localStorage.setItem('authStateControl', state);
    localStorage.setItem('authNonce', nonce);

    let url = authorizationUrl + '?' +
      'response_type=' + encodeURI(response_type) + '&' +
      'client_id=' + encodeURI(client_id) + '&' +
      'redirect_uri=' + encodeURI(redirect_uri) + '&' +
      'scope=' + encodeURI(scope) + '&' +
      'nonce=' + encodeURI(nonce) + '&' +
      'state=' + encodeURI(state);

    window.location.href = url;
  }

  getErrorMessage(err) {
    let message = '';
    if (err.error && err.error.errors) {
      err.error.errors.Body.forEach((m) => {
        message += m;
        message += '<br/>';
      });
    } else if (err.error && err.error.message) {
      message = err.error.message;
    } else {
      message = err.message || 'Internal server error!';
    }

    return message;
  }
}