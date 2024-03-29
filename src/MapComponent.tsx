import React from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { Button, ButtonGroup, CardBody } from "react-bootstrap";
import { groupDataByProduct } from "./utils/generators";
import { data } from "./data";
import { TableData } from "./interface";

const MapComponent = () => {
  const chartTypes: string[] = ["bar", "pie", "line"];
  const dimensions: string[] = [
    "transactions",
    "value",
    "quantity",
    "containers",
    "weight",
  ];
  const [chartType, setChartType] = React.useState<string>("bar");
  const [dimension, setDimension] = React.useState<string>("transactions");
  const [_data, setData] = React.useState<Array<TableData>>([]);

  React.useEffect(() => {
    setData(groupDataByProduct(data));
  }, []);

  React.useLayoutEffect(() => {
    let root = am5.Root.new("chartMap");
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoNaturalEarth1(),
      })
    );
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );
    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    <CardBody className="d-flex flex-column">
      <div className="d-flex" style={{ flex: 1 }} id="chartMap"></div>
      <ButtonGroup aria-label="Basic example" size="sm">
        {dimensions.map((d) => (
          <Button
            key={d}
            variant={dimension === d ? "primary" : "secondary"}
            onClick={() => setDimension(d)}
          >
            {{
              transactions: "Transactions",
              value: "Dollar Value",
              quantity: "Quantity",
              containers: "Containers",
              weight: "Weight",
            }[d] || "weight"}
          </Button>
        ))}
      </ButtonGroup>
    </CardBody>
  );
};

export default MapComponent;
