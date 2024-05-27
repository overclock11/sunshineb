import {DialogType} from "../emuns/dialogType";

export const DIALOG_FIELDS = {
  [DialogType.Variety]: ['id','variety','color'],
  [DialogType.Grade]: ['id', 'grade'],
}

export const PLACEHOLDERS: { [key: string]: string } = {
  id: 'ID',
  variety: 'Variedad',
  color: 'Color',
  grade: 'Grado'
}
