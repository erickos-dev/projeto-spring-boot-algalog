import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregaComponent } from './entrega.component';
import { entregaRoutes } from './entrega.routing';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    RouterModule.forChild(entregaRoutes),
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [EntregaComponent],
  exports: [EntregaComponent],
})
export class EntregaModule { }
