import React, { useState } from "react";
import { NextPage } from "next";
import { Page } from "../components/UI/Page";
import { AirportSelect } from "../components/AirportSelect";
import { Container } from "../components/UI/Container";
import { Grid } from "../components/UI/Grid";
import { SelectValue } from "../components/UI/Select";
import { Airport } from "../types/types";
import { MyAppPageContext } from "../types/appTypes";
import { getAllDestinationsAction, getDestinations } from "../store/destination";
import { connect } from "react-redux";
import { MyMapStateToProps } from "../store/store";

interface PropsFromState {
  destinations: Airport[];
}

interface Props extends PropsFromState {}

const Index: NextPage<Props, {}> = ({ destinations }) => {
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

Index.getInitialProps = async ({ store }: MyAppPageContext) => {
  await store.dispatch(getAllDestinationsAction());

  return {};
};

const mapStateToProps: MyMapStateToProps<PropsFromState> = state => ({ destinations: getDestinations(state) });

export default connect(
  mapStateToProps,
  null
)(Index);
