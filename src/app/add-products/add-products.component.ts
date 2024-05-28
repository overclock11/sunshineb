import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ActionTableComponent} from "../components/action-table/action-table.component";
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from "../components/add-dialog/add-dialog.component";
import {DialogType} from "../emuns/dialogType";
import {DIALOG_FIELDS} from "../constants/dialogFields";
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
  @ViewChild('variety', {static: false}) varietyTable: ActionTableComponent;
  @ViewChild('grade', {static: false}) gradeTable: ActionTableComponent;

  product: Product = {
    id: '',
    name: '',
    specie: '',
    grade: [],
    variety: [],
  };

  previewUrl = '';
  dialogTypes = DialogType
  currentTable: DialogType = DialogType.Variety;
  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    specie: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialog) {}

  removeItemList (index: string): void {
    this.product[this.currentTable]?.splice(parseInt(index), 1);
    this.currentTable === DialogType.Variety ? this.varietyTable.refreshTable() : this.gradeTable.refreshTable();
  }

  openDialog(type: DialogType) {
    this.currentTable = type;
    const ref = this.dialog.open(AddDialogComponent, {
     data: DIALOG_FIELDS[type]
    });
    ref.afterClosed().subscribe( data => {
      const action = { action: true }
      if (data && Object.keys(data).length === 3 ){
        this.product.variety?.push({...data, action });
        this.varietyTable.refreshTable();
      } else if(data) {
        this.product.grade?.push({...data, action });
        this.gradeTable.refreshTable();
      }
      console.log(this.product);
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
    }
  }
}
