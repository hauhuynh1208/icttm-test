import React from "react";
import { Card, CardBody } from "react-bootstrap";
import Table from "./Table";
import ChartComponent from "./ChartComponent";
import MapComponent from "./MapComponent";

function App() {
  return (
    <div
      className="container d-flex h-100 flex-column"
      style={{ paddingTop: 30 }}
    >
      <div className="d-flex gap-5 mb-4 w-100" style={{ height: 450 }}>
        <Card className="w-100">
          <ChartComponent />
        </Card>
        <Card className="w-100">
          <MapComponent />
        </Card>
      </div>
      <Table />
    </div>
  );
}

export default App;
