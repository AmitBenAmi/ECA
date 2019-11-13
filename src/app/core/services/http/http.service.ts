import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient,
        private loggerService: LoggerService) { }

    async get(url: string, options?: HttpRequestOptions) {
        try {
            return await this.httpClient.get(url, options).toPromise();
        } catch (exception) {
            this.loggerService.error("Error in HTTP Get.", exception)
        }
    }

    async post(url: string, body?: any, options?: HttpRequestOptions) {
        try{
            return await this.httpClient.post(url, body, options).toPromise();
        } catch (exception) {
            this.loggerService.error("Error in HTTP Post.", exception)
        }
    }

    async put(url: string, body?: any, options?: HttpRequestOptions) {
        try {
            return await this.httpClient.put(url, body, options).toPromise();
        } catch (exception) {
            this.loggerService.error("Error in HTTP Put.", exception)
        }
    }

    async delete(url: string, options?: HttpRequestOptions) {
        try {
            return await this.httpClient.delete(url, options).toPromise();
        } catch (exception) {
            this.loggerService.error("Error in HTTP Delete.", exception)
        }
    }
}

export class HttpRequestOptions {
    constructor(
        public headers?: { [name: string]: string | string[] }, 
        public params?: { [name: string]: string | string[] }, 
        public reportProgress?: boolean, 
        public responseType?: 'json', 
        public withCredentials?: boolean) {  }
}