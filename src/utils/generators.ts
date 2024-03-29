import { metrics } from "../constants";
import { Data, MapData, TableData } from "../interface";

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

export function groupDataByCountry(rawData: Data[]): MapData[] {
  function getCountryCode(countryName: string): string {
    return rawData.filter((_rawData) => _rawData.country === countryName)[0]
      .countryCode;
  }

  const countries: string[] = Array.from(
    new Set(rawData.map((_rawData) => _rawData.country))
  );
  const products: string[] = Array.from(
    new Set(rawData.map((_rawData) => _rawData.product))
  );
  let result: MapData[] = [];
  for (let country of countries) {
    const dataAfterFilteredByCountry = rawData.filter(
      (_rawData) => _rawData.country === country
    );
    const countryCode = getCountryCode(country);
    let _result: MapData = { country, countryCode, data: [] };
    for (let product of products) {
      let productAndMetrics: any = { product };
      for (let metric of metrics) {
        let obj = {
          [metric]: dataAfterFilteredByCountry
            .filter((_data) => _data.product === product)
            .reduce((acc: any, obj) => acc + obj[metric], 0),
        };
        productAndMetrics = { ...productAndMetrics, ...obj };
      }
      _result.data.push(productAndMetrics);
    }

    result.push(_result);
  }
  return result;
}
