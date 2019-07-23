import React from "react";
import { Airport, DayListFromStore } from "../types/types";
import { MyMapStateToProps } from "../types/store";
import { connect } from "react-redux";
import { TableRow, TableCell } from "@material-ui/core";
import moment from "moment";
import { getDayAndMonth, getTime } from "../lib/dateUtils";
import { getAllAirportsFromDayList } from "../store/reducers/flight";

interface ContainerProps {
  daylist: DayListFromStore;
}

interface Props {
  daylist: DayListFromStore;
  airports: { [AirportCode: string]: Airport };
}

const FlightDetailView: React.FC<Props> = ({ airports, daylist: { flights } }) => {
  if (flights.length) {
    const numOfTransfers = flights.length - 1;
    const dep = flights[0];
    const arr = flights[numOfTransfers];

    const departureMoment = moment(dep.departureDateTime);
    const departureDate = `${getDayAndMonth(departureMoment)}, ${getTime(departureMoment)}`;
    const arrivalMoment = moment(arr.arrivalDateTime);
    const arrivalDate = `${getDayAndMonth(arrivalMoment)}, ${getTime(arrivalMoment)}`;

    return (
      <TableRow>
        <TableCell>{`${airports[dep.depIata].AirportCityName} (${dep.depIata}) - ${departureDate}`}</TableCell>
        <TableCell>{`${airports[arr.arrIata].AirportCityName} (${arr.arrIata}) - ${arrivalDate}`}</TableCell>
        <TableCell>{!numOfTransfers ? "Žádné" : `${numOfTransfers} přestupů`}</TableCell>
      </TableRow>
    );
  }
  return null;
};

const mapStateToProps: MyMapStateToProps<Props, ContainerProps> = (state, { daylist }) => ({
  daylist,
  airports: getAllAirportsFromDayList(state, daylist)
});

export const FlightDetail = connect(
  mapStateToProps,
  null
)(FlightDetailView);
