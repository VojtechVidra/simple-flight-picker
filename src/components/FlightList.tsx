import React from "react";
import { FlightWithId } from "../types/types";
import { WhiteContainer } from "./WhiteContainer";
import Table from "@material-ui/core/Table";
import { TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { connect } from "react-redux";
import { MyMapStateToProps } from "../types/store";
import { getPrices, arePricesLoading } from "../store/reducers/flight";
import { FlightDetail } from "./FlightDetail";

interface ContainerProps {
  calendarPriceListId: string;
}

interface Props {
  data: FlightWithId[];
  loading: boolean;
}

const FlightListView: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return <span>Loading..</span>;
  }
  if (data.length) {
    return (
      <WhiteContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Odlet</TableCell>
              <TableCell>Přílet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(flight => (
              <FlightDetail key={flight.id} flight={flight} />
            ))}
          </TableBody>
        </Table>
      </WhiteContainer>
    );
  }
  return null;
};

const mapStateToProps: MyMapStateToProps<Props, ContainerProps> = (state, { calendarPriceListId }) => ({
  data: getPrices(state, calendarPriceListId),
  loading: arePricesLoading(state)
});

export const FlightList = connect(
  mapStateToProps,
  null
)(FlightListView);
