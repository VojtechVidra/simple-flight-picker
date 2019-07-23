import React from "react";
import { DayListFromStore } from "../types/types";
import { WhiteContainer } from "./WhiteContainer";
import Table from "@material-ui/core/Table";
import { TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { connect } from "react-redux";
import { MyMapStateToProps } from "../types/store";
import { getPrices, arePricesLoading } from "../store/reducers/flight";
import { FlightDetail } from "./FlightDetail";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ContainerProps {
  calendarPriceListId: string;
}

interface Props {
  data: DayListFromStore[];
  loading: boolean;
}

const FlightListView: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <WhiteContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Odlet</TableCell>
            <TableCell>Přílet</TableCell>
            <TableCell>Přestupy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map(dayList => <FlightDetail key={dayList.date} daylist={dayList} />)
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Žádná data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </WhiteContainer>
  );
};

const mapStateToProps: MyMapStateToProps<Props, ContainerProps> = (state, { calendarPriceListId }) => ({
  data: getPrices(state, calendarPriceListId),
  loading: arePricesLoading(state)
});

export const FlightList = connect(
  mapStateToProps,
  null
)(FlightListView);
