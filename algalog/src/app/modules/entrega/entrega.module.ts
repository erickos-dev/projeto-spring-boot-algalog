import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregaComponent } from './entrega.component';
import { entregaRoutes } from './entrega.routing';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    RouterModule.forChild(entregaRoutes),
    CommonModule,

  ],
  declarations: [EntregaComponent],
  exports: [EntregaComponent],
})
export class EntregaModule { }
