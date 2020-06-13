import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";
import { Button, Form, Input } from "semantic-ui-react";
import axios from "axios";
import { spaceId, accessToken, apiKey, restApiKey } from "hereConfig";

console.log(spaceId);
const UploadPage = () => {
  const [verificationData, setverificationData] = useState({});
  const [result, setResult] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [passW, setPassW] = useState("");
  const [availBed, setAvailBed] = useState("");
  const [equipBed, setEquipBed] = useState("");
  const [totBed, setTotBed] = useState("");

  useEffect(() => {
    // setResult(JSON.stringify(verificationData));
  }, [verificationData]);

  useEffect(() => {
    getIDPass();
  }, []);

  async function getIDPass() {
    axios
      .get(
        `https://xyz.api.here.com/hub/spaces/${spaceId}/iterate?access_token=${accessToken}`
      )
      .then(function (response) {
        let data = {};
        let csvStr = "";
        console.log(response.data);
        response.data.features.forEach((element) => {
          data[element.id] = element.properties.password;
          csvStr += `${element.id},${element.properties.hospitalName},${element.properties.password}\n`;
        });
        // console.log(data);
        console.log(csvStr);
        setverificationData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function updateInfo() {
    setResult(" ");
    console.log(uniqueID, passW, availBed, equipBed, totBed);
    if (uniqueID in verificationData) {
      setResult("Verified Unique ID");
      if (verificationData[uniqueID] === passW) {
        setResult(result + "\nVerified Password");
        console.log("all good");
      } else {
        setResult(result + "Wrong Password");
      }
    } else {
      setResult("Wrong Unique ID");
    }
    // axios
    //   .get(
    //     `https://xyz.api.here.com/hub/spaces/${spaceId}/iterate?access_token=${accessToken}`
    //   )
    //   .then(function (response) {
    //     let data = {};
    //     let csvStr = "";
    //     console.log(response.data);
    //     response.data.features.forEach((element) => {
    //       let temp = element.properties;
    //       data[element.id] = element.properties.password;
    //       csvStr += `${element.id},${element.properties.hospitalName},${element.properties.password}\n`
    //     });
    //     console.log(data);
    //     console.log(csvStr);
    //     setverificationData(data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Upload Data</title>
      </Helmet>
      <Form>
        <Form.Input
          label="Unique ID"
          placeholder="Unique ID"
          onChange={(e) => setUniqueID(e.target.value)}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassW(e.target.value)}
        />
        <Form.Input
          type="number"
          label="Available Bed"
          placeholder="Available Bed"
          onChange={(e) => setAvailBed(e.target.value)}
        />
        <Form.Input
          type="number"
          label="Equipted Bed"
          placeholder="Equipted Bed"
          onChange={(e) => setEquipBed(e.target.value)}
        />
        <Form.Input
          type="number"
          label="Total Bed"
          placeholder="Total Bed"
          onChange={(e) => setTotBed(e.target.value)}
        />
        <Button onClick={updateInfo}>Submit</Button>
        <h3>{result}</h3>
      </Form>
    </Layout>
  );
};

export default UploadPage;
