import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ActionTableComponent} from "../components/action-table/action-table.component";
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {AddDialogComponent} from "../components/add-dialog/add-dialog.component";
import {DialogType} from "../emuns/dialogType";
import {DIALOG_FIELDS} from "../constants/dialogFields";

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ActionTableComponent],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {

  dialogTypes = DialogType
  constructor(public dialog: MatDialog) {}

  id = new FormControl("");
  name = new FormControl("");
  specie = new FormControl("");

  removeItemList (removeItem: string): void {
    console.log("remove ittem")
  }

  openDialog(type: DialogType) {
    const ref = this.dialog.open(AddDialogComponent, {
     data: DIALOG_FIELDS[type]
    });
    ref.afterClosed().subscribe( data => {
      console.log(data);
    })
  }

}
