export interface Columns {
  label: string;
  value: string;
}

export interface Data {
  [index: string]: string | number;
  product: string;
  country: string;
  transactions: number;
  value: number;
  quantity: number;
  containers: number;
  weight: number;
}

export interface TableData {
  [index: string]: string | number;
  product: string;
  transactions: number;
  value: number;
  quantity: number;
  containers: number;
  weight: number;
}
