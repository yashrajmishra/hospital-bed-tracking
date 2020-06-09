import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Container from "components/Container";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";

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

const columns = [
  {
    name: "Hospital Name",
    selector: "hospitalName",
    sortable: true,
  },
  {
    name: "Available Beds",
    selector: "availableBed",
    sortable: true,
  },
  {
    name: "Emergency Contact",
    selector: "emergencyContact",
    sortable: true,
  },
  {
    name: "Total Beds",
    selector: "totalBed",
    sortable: true,
  },
  {
    name: "Equipted Beds",
    selector: "equiptedBed",
    sortable: true,
  },
];

const here_space_id = "H8TuI2tP";
const here_access_token = "ADqfe44mQe-Nm0N1ybpXnwA";

const RecordTable = () => {
  const [hereData, sethereData] = useState([]);

  useEffect(() => {
    makeGetRequest();
  }, []);

  async function makeGetRequest() {
    axios
      .get(
        `https://xyz.api.here.com/hub/spaces/${here_space_id}/bbox?west=-180&north=90&east=180&south=-90&access_token=${here_access_token}`
      )
      .then(function (response) {
        let data = [];
        console.log(response.data);
        response.data.features.forEach((element) => {
          let temp = element.properties;
          data.push(temp);
        });
        sethereData(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <DataTable
      title="Tablular view"
      columns={columns}
      data={hereData}
      striped="true"
      highlightOnHover="true"
      pagination="true"
      // theme="solarized"
    />
  );
};

export default RecordTable;
