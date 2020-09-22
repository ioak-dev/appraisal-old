import { Injectable } from '@angular/core';
import {Guid} from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    authEndpoint: string;
    redirectUri: string;
    appId: string;
    scopes: string;
    stateid: Guid;
    nonceid: Guid;
    url: string;

    constructor() {
        this.stateid = Guid.create();
        this.nonceid = Guid.create();
    }

    login(): void {
        var authEndpoint= 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
        var appId = '28f4bd37-06e9-4cb5-bfb3-be5d0b8ab191';
        var redirectUri = 'https://aruun2aruun.github.io/appraisal/login';
        var scopes = 'openid profile User.Read Mail.Read Calendars.Read Contacts.Read';
        //        sessionStorage.authState=this.stateid;
        //        sessionStorage.authNonce=this.nonceid;
        var url= authEndpoint + 'response_type=id_token+token&client_id=' + appId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=' + encodeURIComponent(scopes) + '&state=' + sessionStorage.authState + '&nonce=' + sessionStorage.authNonce + '&response_mode=fragment';
        console.log(url);
        //        this.url= 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=id_token+token&client_id=28f4bd37-06e9-4cb5-bfb3-be5d0b8ab191&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&scope=openid+profile+User.Read+Mail.Read+Calendars.Read+Contacts.Read&state=4d608e1a-8f56-463e-b5f4-332447ddd787&nonce=f893f9d4-8066-44f7-8ff4-1e7de6e0f886&response_mode=fragment';        
    }
}
