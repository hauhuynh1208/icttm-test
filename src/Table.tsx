import React from "react";
import {
  Form,
  InputGroup,
  Table as BSTable,
  Pagination,
} from "react-bootstrap";
import { Columns, Data, TableData } from "./interface";
import { data } from "./data";
import { groupDataByProduct } from "./utils/generators";

const Table = () => {
  const columns: Array<Columns> = [
    {
      label: "Product",
      value: "product",
    },
    {
      label: "Transactions",
      value: "transactions",
    },
    {
      label: "US Dollar Value",
      value: "value",
    },
    {
      label: "Quantity",
      value: "quantity",
    },
    {
      label: "Containers",
      value: "containers",
    },
    {
      label: "Weight",
      value: "weight",
    },
  ];
  const [_data, setData] = React.useState<Array<TableData>>([]);
  React.useEffect(() => {
    setData(groupDataByProduct(data));
  }, []);

  return (
    <div className="w-100">
      <InputGroup className="mb-3 search-bar">
        <Form.Control placeholder="Filter by product name" />
        <InputGroup.Text id="basic-addon2">
          <span className="material-icons">search</span>
        </InputGroup.Text>
      </InputGroup>
      <div className="">
        <BSTable responsive bordered className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.value} className="text-center">
                  <span>{col.label} </span>
                  <span
                    className="material-icons"
                    style={{ cursor: "pointer", fontSize: 14, marginTop: 5 }}
                  >
                    swap_vert
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_data.length
              ? _data.map((d, index) => (
                  <tr key={index}>
                    {columns.map(({ value, label }) => (
                      <td key={value}>
                        <span>{d[value]}</span>
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </BSTable>
      </div>
      <div className="d-flex gap-2 justify-content-center">
        <Pagination size="sm">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
        <Form.Control defaultValue={1} style={{ height: 31, width: 75 }} />
      </div>
    </div>
  );
};

export default Table;
