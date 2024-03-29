import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { api } from '../@core/mock/conf';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { HQAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbCardModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterTermsComponent } from './register/register-terms/register-terms.component';

const formSetting: any = {
    redirectDelay: 0,
    showMessages: {
        success: true,
        failure: true
    },
};

const google_oauth_client_id: string = "74354586769-4gsp4h49oc4o6o3okofjmv3tdjbhd9ln.apps.googleusercontent.com";

let configs = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(google_oauth_client_id)
    }
])

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NbIconModule,
        NbCardModule,
        HQAuthRoutingModule,
        SocialLoginModule.initialize(configs),

        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token', // this parameter tells where to look for the token
                    },
                    baseEndpoint: api.url + 'auth/',
                    login: {
                        endpoint: 'login',
                        method: 'post',
                        redirect: {
                            success: '/app/dashboard',
                            failure: null,
                        },
                        defaultErrors: ['Username/Password combination is not correct, please try again..'],
                        defaultMessages: ['You have been successfully logged in. please wait..'],
                    },
                    register: {
                        endpoint: 'register',
                        method: 'post',
                        redirect: {
                            success: '/auth/login',
                            failure: null,
                        },
                        defaultErrors: ['Something went wrong. please try again..'],
                        defaultMessages: ['You have been successfully registred. please wait..'],
                    },
                }),
            ],
            forms: {
                login: formSetting,
                register: formSetting,
                requestPassword: formSetting,
                resetPassword: formSetting,
                logout: formSetting, 
                validation: {
                    username: {
                        required: true,
                        minLength: 7,
                        maxLength: 50,
                    },
                    fullName: {
                        required: true,
                        minLength: 4,
                        maxLength: 50,
                    },
                },
            },
        }),
    ],
    declarations: [
        // ... here goes our new components
        LoginComponent,
        RegisterComponent,
        RegisterTermsComponent,
    ],
    providers: [
    ],
})
export class HQAuthModule {
}