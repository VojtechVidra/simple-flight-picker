import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { Moment } from "moment";
import { WhiteContainer } from "./WhiteContainer";

interface Props {
  value: Moment | null;
  onChange: (date: Moment | null) => void;
}

export const MonthPicker: React.FC<Props> = ({ onChange, value }) => (
  <WhiteContainer>
    <DatePicker
      value={value}
      openTo="month"
      variant="inline"
      disablePast={true}
      views={["year", "month"]}
      autoOk={true}
      onChange={onChange}
    />
  </WhiteContainer>
);
