import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ActionTableComponent} from "../components/action-table/action-table.component";
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddDialogComponent} from "../components/add-dialog/add-dialog.component";
import {DialogType} from "../emuns/dialogType";
import {DIALOG_FIELDS} from "../constants/dialogFields";
import {Product} from "../interface/product";
import {NgIf} from "@angular/common";
import {db} from "../db/db";

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
    image: '',
    grade: [],
    variety: [],
  };

  previewUrl = '';
  dialogTypes = DialogType
  currentTable: DialogType = DialogType.Variety;
  form = new FormGroup({
    id: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    specie: new FormControl<string>('', [Validators.required])
  });

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

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
        this.product.image = event.target.result;
      }
      reader.readAsDataURL(files[0]);
    }
  }

  async saveProduct() {
    try {
      this.product = {
        ...this.product,
        id: this.form.get('id')?.value as string,
        name: this.form.get('name')?.value as string,
        specie: this.form.get('specie')?.value as string,
      }
      await db.product.add(this.product);
      this._snackBar.open('¡Guardado correctamente!', '', {
        duration: 3000
      })
    } catch (error) {
      console.log(error);
      this._snackBar.open('¡Error guardando, revise que el id no esté repetido!', '', {
        duration: 3000,
      })
    }
  }
}
