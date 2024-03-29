import React from "react";
import { Button, ButtonGroup, CardBody } from "react-bootstrap";
import { TableData } from "./interface";
import { groupDataByProduct } from "./utils/generators";
import { data } from "./data";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const ChartComponent = () => {
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

  return (
    <CardBody className="d-flex flex-column">
      <div className="d-flex gap-1 mb-1">
        {chartTypes.map((c) => (
          <Button
            key={c}
            variant={chartType === c ? "outline-primary" : "outline-secondary"}
            size="sm"
            onClick={() => setChartType(c)}
          >
            <span className="material-icons">
              {{ bar: "bar_chart", pie: "pie_chart" }[c] ||
                "stacked_line_chart"}
            </span>
          </Button>
        ))}
      </div>
      {chartType === "pie" ? (
        <PieChart data={_data} dimension={dimension} />
      ) : (
        <BarChart data={_data} dimension={dimension} />
      )}
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

export default ChartComponent;
