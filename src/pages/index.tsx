import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { getOptionFromAirport } from "../components/AirportSelect";
import { SelectValue } from "../components/Select";
import { Airport } from "../types/types";
import { MyAppPageContext } from "../types/appTypes";
import { getAllDestinationsAction, getDestinations } from "../store/reducers/destination";
import { connect } from "react-redux";
import { MyMapStateToProps } from "../types/store";
import moment, { Moment } from "moment";
import { getPricesAction } from "../store/reducers/flight";
import { getMonthAndYear } from "../lib/dateUtils";
import { IndexPageView } from "../components/IndexPageView";

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
  const [rotateVisible, setRotateVisible] = useState<boolean>(false);

  useEffect(() => {
    const prg = destinations.find(d => d.AirportCode === "PRG");
    prg && setDeparture(getOptionFromAirport(prg));
  }, []);

  useEffect(() => {
    if (departure && arrival) {
      setRotateVisible(true);
    }
    if (departure && arrival && selectedDate) {
      getPrices(departure.value, arrival.value, getMonthAndYear(selectedDate));
    }
  }, [departure, arrival, selectedDate]);

  const swapDestinations = () => {
    if (departure && arrival) {
      const newArrival = { ...departure };
      const newDeparture = { ...arrival };
      setDeparture(newDeparture);
      setArrival(newArrival);
    }
  };

  return (
    <IndexPageView
      {...{
        arrival,
        departure,
        onChangeArrival: setArrival,
        onChangeDeparture: setDeparture,
        destinations,
        onChangeDate: setSelectedDate,
        onRotateClick: swapDestinations,
        rotateVisible,
        selectedDate
      }}
    />
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
