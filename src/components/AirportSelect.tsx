import React from "react";
import { Airport } from "../types/types";
import { Select, SelectValue } from "./Select";
import { Props as ReactSelectProps } from "react-select/src/Select";

interface Props {
  airports?: Airport[];
  loading?: boolean;
  placeholder?: ReactSelectProps["placeholder"];
  value: ReactSelectProps["value"];
  onChange: (value: SelectValue | undefined | null) => void;
}

export const getOptionFromAirport = ({ AirportCityName, AirportName, AirportCode }: Airport): SelectValue => ({
  label: `${AirportCityName}, ${AirportName} (${AirportCode})`,
  value: AirportCode
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
