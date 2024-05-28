import {Component, OnInit, ViewChild} from '@angular/core';
import {liveQuery} from "dexie";
import {db} from "../db/db";
import {ActionTableComponent} from "../components/action-table/action-table.component";
import {ProductTable} from "../interface/productTable";
import {Product} from "../interface/product";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    ActionTableComponent
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  products$ = liveQuery(() => db.product.toArray());
  productTable: ProductTable[] = [];

  @ViewChild('table', {static: false}) table: ActionTableComponent;

  ngOnInit() {
    this.transformData();
  }

  transformData() {
    this.products$.subscribe((products: Product[])=> {
      products.forEach(product => {
        let variety = '';
        let grade = '';
        if (product.variety && product.variety?.length > 0) {
          variety = product.variety[0].variety;
        }
        if (product.grade && product.grade?.length > 0) {
          grade = product.grade[0].grade;
        }

        this.productTable.push({
          id: product.id,
          name: product.name,
          specie: product.specie,
          variety,
          grade,
          image: product.image,
        })
      });
      this.table.refreshTable();
    })
  }
}
