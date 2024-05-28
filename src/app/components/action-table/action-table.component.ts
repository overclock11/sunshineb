import {Component, Input, Output, ViewChild, EventEmitter, OnInit} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import {ProductTable} from "../../interface/productTable";
import {NgIf} from "@angular/common";
import {Grade} from "../../interface/grade";
import {Variety} from "../../interface/variety";
@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './action-table.component.html',
  styleUrl: './action-table.component.scss'
})
export class ActionTableComponent implements OnInit {
  displayedColumns: string[];

  @Input() itemList: ProductTable[] | Grade[] | Variety[] = [];
  @Input() allowAddItems = false;
  @Output() idEmitter = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<void>();
  @ViewChild(MatTable) table: MatTable<ProductTable>;

  ngOnInit() {
    if (this.itemList.length > 0){
      this.displayedColumns = Object.keys(this.itemList[0]) || [];
    }
  }

  removeItem(id: string): void{
    console.log(id);
    this.idEmitter.emit(id);
  }

  addItemToList(): void{
    this.addItem.emit();
  }

  refreshTable(): void {
    this.displayedColumns = Object.keys(this.itemList[0]) || [];
    this.table.renderRows();
  }

}
