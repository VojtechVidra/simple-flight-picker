import React from "react";
import { FlightWithId, Airport } from "../types/types";
import { MyMapStateToProps } from "../types/store";
import { connect } from "react-redux";
import { getDestination } from "../store/reducers/destination";
import { TableRow, TableCell } from "@material-ui/core";
import moment from "moment";
import { getDayOfMonth, getTime } from "../lib/dateUtils";

interface ContainerProps {
  flight: FlightWithId;
}

interface Props {
  flight: FlightWithId;
  depAirport?: Airport;
  arrAirport?: Airport;
}

const FlightDetailView: React.FC<Props> = ({
  arrAirport,
  depAirport,
  flight: { id, departureDateTime, arrivalDateTime }
}) => {
  const departureMoment = moment(departureDateTime);
  const departure = `${getDayOfMonth(departureMoment)}, ${getTime(departureMoment)}`;
  const arrivalMoment = moment(arrivalDateTime);
  const arrival = `${getDayOfMonth(arrivalMoment)}, ${getTime(arrivalMoment)}`;
  return (
    <TableRow key={id}>
      <TableCell>
        {depAirport && `${depAirport.AirportCityName} (${depAirport.AirportCode})`} - {departure}
      </TableCell>
      <TableCell>
        {arrAirport && `${arrAirport.AirportCityName} (${arrAirport.AirportCode})`} - {arrival}
      </TableCell>
    </TableRow>
  );
};

const mapStateToProps: MyMapStateToProps<Props, ContainerProps> = (state, { flight }) => ({
  flight,
  depAirport: getDestination(state, flight.depIata),
  arrAirport: getDestination(state, flight.arrIata)
});

export const FlightDetail = connect(
  mapStateToProps,
  null
)(FlightDetailView);
