import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {F} from "@angular/cdk/keycodes";
import {ProductTable} from "../interface/productTable";
import {Product} from "../interface/product";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ActionTableComponent, NgIf],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {

  @ViewChild('inputLoadFile', {static: false}) inputLoadFile: ElementRef;

  products: Product = {
    id: '',
    name: '',
    specie: '',
    grade: [],
    variety: [],
  };

  previewUrl = '';
  dialogTypes = DialogType
  constructor(public dialog: MatDialog) {}
  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    specie: new FormControl('', [Validators.required])
  });

  removeItemList (removeItem: string): void {
    console.log("remove ittem")
  }

  openDialog(type: DialogType) {
    const ref = this.dialog.open(AddDialogComponent, {
     data: DIALOG_FIELDS[type]
    });
    ref.afterClosed().subscribe( data => {
      if (DIALOG_FIELDS[type].length === 2 && data){
        this.products.variety?.push(data);
      } else if(data) {
        this.products.grade?.push(data);
      }
      console.log(this.products);
    })
  }

  loadFile() {
    this.inputLoadFile.nativeElement.click();
  }

  updatePreview(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
      }
      reader.readAsDataURL(files[0]);
      console.log("FileUpload -> files", files);
    }
  }
}
