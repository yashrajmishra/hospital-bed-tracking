import React from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Container from "components/Container";
import { Button, Form, Message } from "semantic-ui-react";

const UploadPage = () => {
  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div style={align}>
        <Form success>
          <Form.Input label="Email" placeholder="joe@schmoe.com" />
          <Message
            success
            header="Form Completed"
            content="You're all signed up for the newsletter"
          />
          <Button>Submit</Button>
        </Form>
      </div>
    </Layout>
  );
};

export default UploadPage;
