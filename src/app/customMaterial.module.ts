import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule,MatInputModule],
})
export class MyOwnCustomMaterialModule { }