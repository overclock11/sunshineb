import {Variety} from "./variety";
import {Grade} from "./grade";
import {DialogType} from "../emuns/dialogType";

export interface Product {
  id: string;
  name: string;
  specie: string;
  image: string;
  [DialogType.Variety]?: Variety[];
  [DialogType.Grade]?: Grade[];
}
