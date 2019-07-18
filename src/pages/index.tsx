import React from "react";
import { NextPage } from "next";
import { Page } from "../components/UI/Page";
import { AirportSelect } from "../components/AirportSelect";
import { Airports } from "../mocks/Airport";
import { Container } from "../components/UI/Container";

const Index: NextPage = () => (
  <Page>
    <Container>
      <AirportSelect airports={Airports} />
    </Container>
  </Page>
);

export default Index;
