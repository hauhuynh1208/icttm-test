import { metrics } from "../constants";
import { Data, TableData } from "../interface";

export function groupDataByProduct(rawData: Data[]): TableData[] {
  const products = Array.from(
    new Set(rawData.map((_rawData) => _rawData.product))
  );
  let result: TableData[] = [];
  for (let product of products) {
    const dataAfterFilteredByProduct = rawData.filter(
      (_rawData) => _rawData.product === product
    );
    let _result = { product };
    for (let metric of metrics) {
      let obj = {
        [metric]: dataAfterFilteredByProduct.reduce(
          (acc: any, obj) => acc + obj[metric],
          0
        ),
      };
      _result = { ..._result, ...obj };
    }
    result.push(_result as TableData);
  }
  return result;
}
