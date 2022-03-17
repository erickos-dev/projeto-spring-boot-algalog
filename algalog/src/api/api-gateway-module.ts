import { NgModule } from '@angular/core';
import { ApiGateway } from './api-gateway';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarContainer, MatSnackBarModule } from '@angular/material/snack-bar';


export { ApiGateway };

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,

  ],
  exports: [
    MatSnackBarModule,
  ],
  providers: [
    ApiGateway,
  ],
  entryComponents: [
    MatSnackBarContainer,
  ],
})
export class ApiGatewayModule { }
