import React from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";
import MapMaker from "components/MapMaker";

const SecondPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>Page Two</title>
      </Helmet>
      <MapMaker />
    </Layout>
  );
};

export default SecondPage;
