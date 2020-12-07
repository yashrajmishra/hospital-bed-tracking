import React from "react";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      // style={{ margin: "0"}}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column>
            <Header inverted as="h4">
              Made with 💖 by Hitesh Garg and Adit Agarwal
            </Header>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
