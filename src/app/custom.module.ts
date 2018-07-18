import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule, 
            MatCheckboxModule,
            MatInputModule, 
            FormsModule, 
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule,
            MatFormFieldModule,
            MatSelectModule,
            MatOptionModule,
            MatRadioModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule],

  exports: [MatButtonModule,
            MatCheckboxModule,
            MatInputModule,
            FormsModule, 
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule,
            MatFormFieldModule,
            MatSelectModule,
            MatOptionModule,
            MatRadioModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule],
})

export class MyOwnCustomModule { }