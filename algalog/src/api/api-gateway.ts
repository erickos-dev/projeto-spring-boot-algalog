import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Environment } from 'src/app/decorators/environment.decorator';
import { Observable, Subject, throwError } from "rxjs";
import { catchError, finalize } from 'rxjs/operators';

// Import the rxjs operators we need (in a production app you'll
//  probably want to import only the operators you actually use)
//
//import 'rxjs/Rx';

export declare const enum RequestMethod {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE",
    Options = "OPTIONS",
    Head = "HEAD",
    Patch = "PATCH"
}

export class ApiGatewayOptions {
    @Environment('baseUrl') baseUrl: string;
    method: RequestMethod;
    url: string;
    headers: HttpHeaders;
    params = {};
    data = {};
}

@Injectable({
    providedIn: 'root'
})
export class ApiGateway {
    public instanceNumber: number = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;


    // Define the internal Subject we'll use to push errors
    private errorsSubject = new Subject<any>();

    // Provide the *public* Observable that clients can subscribe to
    errors$: Observable<any>;

    // Define the internal Subject we'll use to push the command count
    private pendingCommandsSubject = new Subject<number>();
    private pendingCommandCount = 0;


    // Provide the *public* Observable that clients can subscribe to
    pendingCommands$: Observable<number>;

    @Output() tokenExpired: EventEmitter<any> = new EventEmitter();

    constructor(
        // private _fuseNavigationService: FuseNavigationService,
        public http: HttpClient,

    ) {
        // Create our observables from the subjects
        this.errors$ = this.errorsSubject.asObservable();
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }

    // I perform a GET request to the API, appending the given params
    // as URL search parameters. Returns a stream.
    get(url: string, params?: any, showLoading?: boolean): Observable<any> {
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Get;
        options.url = url;
        options.params = params;

        this.http.request(options.method, options.url, options.params);
        return this.request(options, showLoading);;
    }

    // I perform a POST request to the API. If both the params and data
    // are present, the params will be appended as URL search parameters
    // and the data will be serialized as a JSON payload. If only the
    // data is present, it will be serialized as a JSON payload. Returns
    // a stream.
    post(url: string, params?: any, data?: any): Observable<any> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    }

    put(url: string, params?: any, data?: any) {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;

        return this.request(options);
    }

    delete(url: string, params?: any, data?: any) {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Delete;
        options.url = url;
        options.params = params;
        options.data = data;

        return this.request(options);
    }


    patch(url: string, params?: any, data?: any) {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Patch;
        options.url = url;
        options.params = params;
        options.data = data;

        return this.request(options);
    }

    head(url: string, params: any, data: any) {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method = RequestMethod.Head;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    }

    private request(options: ApiGatewayOptions, showLoading?: boolean): Observable<any> {

        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || "");
        options.headers = (options.headers || new HttpHeaders());
        options.params = (options.params || {});
        options.data = (options.data || {});

        this.interpolateUrl(options);
        this.addXsrfToken(options);

        if (!(options.data instanceof FormData)) {
            this.addContentType(options);
        }
        this.addAuthToken(options);
        let requestOptions = {
            "method": options.method,
            "url": options.baseUrl + options.url,
            "headers": options.headers,
            "search": this.buildUrlSearchParams(options.params),
            "body": JSON.stringify(options.data),
            observe: 'response' as 'response'
        }

        let isCommand = showLoading === true || (options.method !== RequestMethod.Get);

        if (isCommand) {
            this.pendingCommandsSubject.next(++this.pendingCommandCount);
        }

        if (isCommand) {
            // this.loader.show();
        }

        let stream = this.http.request(requestOptions.method, requestOptions.url, requestOptions)
            .pipe(
                catchError(error => {
                    this.errorsSubject.next(error);
                    return throwError(error);
                }),
                catchError(error => {
                    return throwError(this.unwrapHttpError(error));

                }),
                finalize(() => {
                    if (isCommand) {
                        this.pendingCommandsSubject.next(--this.pendingCommandCount);
                    }

                    if (isCommand) {
                        // this.loader.hide();
                    }
                })
            );
        return stream;
    }

    private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
        if (options.method !== RequestMethod.Get) {
            options.headers = options.headers.append('Content-Type', 'application/json;  charset=UTF-8');
        }
        return options;
    }

    private extractValue(collection: any, key: string): any {
        var value = collection[key];
        delete (collection[key]);
        return value;
    }

    private addXsrfToken(options: ApiGatewayOptions): ApiGatewayOptions {

        var xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers = options.headers.append('X-XSRF-TOKEN', xsrfToken);
        }
        return options;
    }
    private addAuthToken(options: ApiGatewayOptions): ApiGatewayOptions {

        // let authToken = this.authService.currentUserToken;
        // if (authToken) {
        //     options.headers = options.headers.append('X-Auth-Token', authToken);
        // }
        // let authTokenCriticalOperation = this.authService.criticalToken;
        // if (authTokenCriticalOperation) {
        //     options.headers = options.headers.append('X-Auth-Token-Critical-Operation', authTokenCriticalOperation);
        //     localStorage.removeItem('tokenCriticalOperation');
        // }

        return options;
    }

    private getXsrfCookie(): string {

        var matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return (matches && decodeURIComponent(matches[1]));
        } catch (decodeError) {
            return ("");
        }
    }

    private buildUrlSearchParams(params: any): HttpParams {
        var searchParams = new HttpParams();
        for (var key in params) {
            searchParams.append(key, params[key])
        }
        return searchParams;
    }

    private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
        options.url = options.url.replace(
            /:([a-zA-Z]+[\w-]*)/g,
            ($0, token) => {
                // Try to move matching token from the params collection.
                if (options.params.hasOwnProperty(token)) {
                    return (this.extractValue(options.params, token));
                }
                // Try to move matching token from the data collection.
                if (options.data.hasOwnProperty(token)) {
                    return (this.extractValue(options.data, token));
                }
                // If a matching value couldn't be found, just replace
                // the token with the empty string.
                return ("");
            }
        );
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, "/");
        // Clean up any trailing slashes.
        //options.url = options.url.replace(/\/+$/g, "");

        return options;
    }

    private unwrapHttpError(error: any): any {
        try {
            if (!error.message) {
                error = { message: 'Erro ao conectar-se ao servidor.', _error: error };
                // this.snackBar.errorMessage(error.message);
            }
            const excepetion = error.error;
            if (error.status == 401) {
                this.tokenExpired.emit();
            } else if (!excepetion.code) {
                // this.snackBar.unexpectedMessage();
            } else
                switch (excepetion.code) {
                    // case "APPLICATION_EXCEPTION":
                    // case "INVALID_AUTHENTICATION":
                    // case "ACESS_DENIED_EXCEPTION":
                    //     this.snackBar.warnMessage(excepetion.message + ' [Error: ' + excepetion.errorCode + ']');
                    //     break;

                    // case "SYSTEM_EXCEPTION":
                    //     this.snackBar.errorMessage(excepetion.message + ' [Error: ' + excepetion.errorCode + ']');
                    //     break;

                    // case "FORBIDDEN_ACCESS":
                    //     this.snackBar.warnMessage("Sessão expirada. Favor acessar novamente.");
                    //     this.tokenExpired.emit();
                    //     break;
                }
            return error;
        } catch (jsonError) {
            // this.snackBar.unexpectedMessage();
            return ({
                code: -1,
                message: "Erro ao conectar-se ao servidor. Tente novamente mais tarde.",
                jsonError
            });
        }
    }

    private unwrapHttpValue(res: any): any {
        if (res.text()) {
            let result = res.json();
            result['headers'] = res.headers;
            return result;
        }
        return { headers: res.headers };
    }
}
