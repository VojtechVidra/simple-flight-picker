import React from "react";
import withSizes, { Sizes } from "react-sizes";
import { RotateIcon } from "../components/RotateIcon";
import { Button } from "../components/Button";
import { FlightList } from "../components/FlightList";
import { getCalendarId } from "../lib/flightsNormalizer";
import { MonthPicker } from "../components/MonthPicker";
import { Container } from "../components/Container";
import { Grid } from "../components/Grid";
import { Page } from "../components/Page";
import { AirportSelect } from "./AirportSelect";
import { Airport } from "../types/types";
import { SelectValue } from "./Select";
import { Moment } from "moment";
import { getMonthAndYear } from "../lib/dateUtils";
import { Paragraph } from "./Paragraph";

interface SizeProps {
  isMobile?: boolean;
}

interface Props extends SizeProps {
  onRotateClick: () => void;
  rotateVisible: boolean;
  destinations: Airport[];
  departure?: SelectValue | null;
  arrival?: SelectValue | null;
  selectedDate: Moment | null;
  onChangeDeparture: (value?: SelectValue | null) => void;
  onChangeArrival: (value?: SelectValue | null) => void;
  onChangeDate: (value: Moment | null) => void;
}

const IndexPage: React.FC<Props> = ({
  onRotateClick,
  rotateVisible,
  arrival,
  departure,
  destinations,
  selectedDate,
  onChangeArrival,
  onChangeDate,
  onChangeDeparture,
  isMobile
}) => (
  <Page>
    <Container>
      <Grid container={true} wrap="wrap">
        <Grid flex={1} padding="10px" basis={isMobile ? "100%" : undefined}>
          <AirportSelect value={departure} onChange={onChangeDeparture} airports={destinations} placeholder="Odkud" />
        </Grid>
        <Grid container={true} flex={isMobile ? 1 : 0} padding="10px" align="center" justify="center">
          {rotateVisible && (
            <Button onClick={onRotateClick}>
              <RotateIcon />
            </Button>
          )}
        </Grid>
        <Grid flex={1} padding="10px" basis={isMobile ? "100%" : undefined}>
          <AirportSelect value={arrival} onChange={onChangeArrival} airports={destinations} placeholder="Kam" />
        </Grid>
      </Grid>
      <Grid container={true} justify="flex-end">
        <Grid container={true} align="center">
          <Grid padding="10px">
            <Paragraph color="#fff">Vyberte měsíc a rok</Paragraph>
          </Grid>
          <Grid padding="10px">
            <MonthPicker value={selectedDate} onChange={onChangeDate} />
          </Grid>
        </Grid>
      </Grid>

      {departure && arrival && selectedDate && (
        <Grid container={true} padding="10px" justify="center">
          <FlightList
            calendarPriceListId={getCalendarId(departure.value, arrival.value, getMonthAndYear(selectedDate))}
          />
        </Grid>
      )}
    </Container>
  </Page>
);

const mapSizesToProps = ({ width }: Sizes) => ({ isMobile: 768 > width });

export const IndexPageView = withSizes<SizeProps, Props>(mapSizesToProps)(IndexPage);
