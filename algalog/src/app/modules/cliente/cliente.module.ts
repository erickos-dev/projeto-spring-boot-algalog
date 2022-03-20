import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

import { RouterModule } from '@angular/router';
import { clienteRoutes } from './cliente.routing';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteService } from './cliente.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clienteRoutes),
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  declarations: [ClienteComponent, ClienteListaComponent],
  providers: [ClienteService]
})
export class ClienteModule { }
