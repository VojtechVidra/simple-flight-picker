import React, { useState } from "react";
import { NextPage } from "next";
import { Page } from "../components/UI/Page";
import { AirportSelect } from "../components/AirportSelect";
import { Airports } from "../mocks/Airport";
import { Container } from "../components/UI/Container";
import { Grid } from "../components/UI/Grid";
import { SelectValue } from "../components/UI/Select";

const Index: NextPage = () => {
  const [start, setStart] = useState<SelectValue | null | undefined>();
  const [destination, setDestination] = useState<SelectValue | null | undefined>();

  return (
    <Page>
      <Container>
        <Grid container={true}>
          <Grid flex={1} padding="10px">
            <AirportSelect value={start} onChange={setStart} airports={Airports} placeholder="Odkud" />
          </Grid>
          <Grid flex={0} padding="10px">
            Switch
          </Grid>
          <Grid flex={1} padding="10px">
            <AirportSelect value={destination} onChange={setDestination} airports={Airports} placeholder="Kam" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Index;
