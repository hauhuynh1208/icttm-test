import React from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { Button, ButtonGroup, CardBody } from "react-bootstrap";
import { groupDataByCountry } from "./utils/generators";
import { data } from "./data";
import { MapData, TableData } from "./interface";

const MapComponent = () => {
  const dimensions: string[] = [
    "transactions",
    "value",
    "quantity",
    "containers",
    "weight",
  ];
  const [dimension, setDimension] = React.useState<string>("transactions");
  const [_data, setData] = React.useState<Array<MapData>>([]);

  function transformData(rawData: MapData[]) {
    return rawData.map((d: MapData) => ({
      ...d,
      id: d.countryCode,
      polygonSettings: {
        fill: am5.color("#512da8"),
      },
    }));
  }
  React.useEffect(() => {
    const result = transformData(groupDataByCountry(data)).map(
      (_dataGroupedByCountry) => {
        return {
          ..._dataGroupedByCountry,
          data: _dataGroupedByCountry.data.filter((d) => d[dimension] !== 0),
        };
      }
    );
    setData(result);
  }, [dimension]);
  React.useLayoutEffect(() => {
    let root = am5.Root.new("chartMap");
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    chart.chartContainer.get("background")?.events.on("click", function () {
      chart.goHome();
    });
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{country}:\n {id}",
      toggleKey: "active",
      interactive: true,
      fill: am5.color("#eeeeee"),
      stroke: am5.color("#757575"),
      templateField: "polygonSettings",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });
    polygonSeries.mapPolygons.template.states.create("active", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });
    polygonSeries.data.setAll(_data);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [_data, dimension]);
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
