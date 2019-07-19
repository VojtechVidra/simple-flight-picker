import { Airport } from "../types/types";
import { Select, SelectValue } from "./UI/Select";
import { Props as ReactSelectProps } from "react-select/src/Select";

interface Props {
  airports?: Airport[];
  loading?: boolean;
  placeholder?: ReactSelectProps["placeholder"];
  value: ReactSelectProps["value"];
  onChange: (value: SelectValue | undefined | null) => void;
}

const getOptionFromAirport = ({ AirportCityName, AirportName, AirportCode, DestinationID }: Airport): SelectValue => ({
  label: `${AirportCityName}, ${AirportName} (${AirportCode})`,
  value: DestinationID.toString()
});

export const AirportSelect: React.FC<Props> = ({ airports, placeholder, value, onChange }) => (
  <Select
    onChange={v => onChange(v as SelectValue | undefined | null)}
    value={value}
    options={airports && airports.map(getOptionFromAirport)}
    placeholder={placeholder}
    isMulti={false}
  />
);
