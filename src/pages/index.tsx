import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Page } from "../components/Page";
import { AirportSelect } from "../components/AirportSelect";
import { Container } from "../components/Container";
import { Grid } from "../components/Grid";
import { SelectValue } from "../components/Select";
import { Airport } from "../types/types";
import { MyAppPageContext } from "../types/appTypes";
import { getAllDestinationsAction, getDestinations } from "../store/reducers/destination";
import { connect } from "react-redux";
import { MyMapStateToProps } from "../types/store";
import { MonthPicker } from "../components/MonthPicker";
import moment, { Moment } from "moment";
import { getPricesAction } from "../store/reducers/flight";
import { FlightList } from "../components/FlightList";
import { getCalendarId } from "../lib/flightsConverter";
import { getMonthAndYear } from "../lib/dateUtils";

interface PropsFromState {
  destinations: Airport[];
}
interface DispatchProps {
  getPrices: typeof getPricesAction;
}

interface Props extends PropsFromState, DispatchProps {}

const Index: NextPage<Props, {}> = ({ destinations, getPrices }) => {
  const [departure, setDeparture] = useState<SelectValue | null | undefined>();
  const [arrival, setArrival] = useState<SelectValue | null | undefined>();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  useEffect(() => {
    if (departure && arrival && selectedDate) {
      getPrices(departure.value, arrival.value, getMonthAndYear(selectedDate));
    }
  }, [departure, arrival, selectedDate]);

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
        <Grid container={true} justify="flex-end">
          <Grid container={true} align="center">
            <Grid padding="10px">Vyberte měsíc a rok</Grid>
            <Grid padding="10px">
              <MonthPicker value={selectedDate} onChange={setSelectedDate} />
            </Grid>
          </Grid>
        </Grid>

        {departure && arrival && selectedDate && (
          <Grid container={true} padding="10px">
            <FlightList
              calendarPriceListId={getCalendarId(departure.value, arrival.value, getMonthAndYear(selectedDate))}
            />
          </Grid>
        )}
      </Container>
    </Page>
  );
};

Index.getInitialProps = async ({ store }: MyAppPageContext) => {
  await store.dispatch(getAllDestinationsAction());

  return {};
};

const mapStateToProps: MyMapStateToProps<PropsFromState> = state => ({ destinations: getDestinations(state) });

const mapDispatchToProps: DispatchProps = {
  getPrices: getPricesAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
