import React, { useState } from "react";
import { NextPage } from "next";
import { Page } from "../components/UI/Page";
import { AirportSelect } from "../components/AirportSelect";
import { Container } from "../components/UI/Container";
import { Grid } from "../components/UI/Grid";
import { SelectValue } from "../components/UI/Select";
import { Airport } from "../types/types";
import { getAllDestinations } from "../api/api";
import { MyAppPageContext } from "../types/appTypes";

interface Props {
  destinations: Airport[];
}

const Index: NextPage<Props> = ({ destinations }) => {
  const [departure, setDeparture] = useState<SelectValue | null | undefined>();
  const [arrival, setArrival] = useState<SelectValue | null | undefined>();

  return (
    <Page>
      <Container>
        <Grid container={true}>
          <Grid flex={1} padding="10px">
            <AirportSelect value={departure} onChange={setDeparture} airports={destinations} placeholder="Odkud" />
          </Grid>
          <Grid flex={0} padding="10px">
            Switch
          </Grid>
          <Grid flex={1} padding="10px">
            <AirportSelect value={arrival} onChange={setArrival} airports={destinations} placeholder="Kam" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Index.getInitialProps = async (_ctx: MyAppPageContext) => {
  const destinations = await getAllDestinations();

  return { destinations };
};

export default Index;
