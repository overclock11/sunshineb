import {Variety} from "./variety";
import {Grade} from "./grade";

export interface Product {
  id: string;
  name: string;
  specie: string;
  variety?: Variety[];
  grade?: Grade[];
}
