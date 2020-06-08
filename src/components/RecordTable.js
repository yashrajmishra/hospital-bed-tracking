import React from "react";
import { Link } from "gatsby";
import Container from "components/Container";
import DataTable, { createTheme } from "react-data-table-component";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const data = [{ id: 1, title: "Dicks out for harambe", year: "1982" }];

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
    right: true,
  },
];

const RecordTable = () => {
  return (
    <DataTable
      title="Sample Table"
      columns={columns}
      data={data}
      theme="solarized"
    />
  );
};

export default RecordTable;
