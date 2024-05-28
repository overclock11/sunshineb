import Dexie, {Table} from "dexie";
import {Product} from "../interface/product";

export class AppDB extends Dexie {
  product!: Table<Product, number>;

  constructor() {
    super('sunshineb');
    this.version(1).stores({
      product: 'id'
    })
    this.on('populate', () => this.preload());
  }

  async preload() {
    await db.product.bulkAdd([
      {
        "id": "1",
        "name": "Orquidea",
        "specie": "Plantus di tierras",
        "image": "",
        "grade": [
          {
            "id": "4",
            "grade": "dasda",
          }
        ],
        "variety": [
          {
            "id": "3",
            "variety": "elcacasd",
            "color": "cafe",
          }
        ]
      },
      {
        "id": "2",
        "name": "Tulipan",
        "specie": "Coloris florcitus",
        "image": "",
        "grade": [
          {
            "id": "4",
            "grade": "dasda",
          }
        ],
        "variety": [
          {
            "id": "3",
            "variety": "elcacasd",
            "color": "cafe",
          }
        ]
      }
    ]);
  }
}
export const db = new AppDB();
