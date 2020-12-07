import React from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import MapMaker from "components/mapMaker";
import { Container, Header } from "semantic-ui-react";

const AboutPage = () => {
  return (
    <Layout pageName="home">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">About Project</Header>
        <p>
          Many people have supported me, in different ways, during the work with
          the thesis. <br />
          I’d like to thank my guide Dr. Bhavna Sharma & HOD Dr. Naveen
          Hemrajani for their kind and active support and valuable guidance
          during the work process. My family has as always offered me their
          unconditional support, thank you! I have taken efforts in the Minor
          Project. However, it would not have been possible without the kind
          support and many individuals and organizations. I would like to extend
          my sincere thanks to each and every member related to JECRC
          University.
        </p>
      </Container>
    </Layout>
  );
};

export default AboutPage;
