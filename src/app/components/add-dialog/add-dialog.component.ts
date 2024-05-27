import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {PLACEHOLDERS} from "../../constants/dialogFields";

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgForOf],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent implements OnInit {
  labels: typeof PLACEHOLDERS = PLACEHOLDERS;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string[]) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.data.forEach((field)=>{
      this.form.addControl(field, new FormControl('', [Validators.required]));
    })
  }

  closeDialog() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
