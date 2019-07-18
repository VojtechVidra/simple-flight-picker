import { Airport } from "../types/types";
import { Select } from "./UI/Select";

interface Props {
  airports: Airport[];
}

const getOptionFromAirport = ({
  AirportCityName,
  AirportName,
  AirportCode,
  DestinationID
}: Airport): { label: string; value: string } => ({
  label: `${AirportCityName}, ${AirportName} (${AirportCode})`,
  value: DestinationID.toString()
});

export const AirportSelect: React.FC<Props> = ({ airports }) => (
  <Select options={airports.map(getOptionFromAirport)} placeholder="Letiště" />
);
