import {Component, Input} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {Product} from "../../interface/product";
@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './action-table.component.html',
  styleUrl: './action-table.component.scss'
})
export class ActionTableComponent {
  displayedColumns: string[] = ['id', 'name'];

  @Input() itemList: Product[] = [];
}
