import ReactSelect from "react-select";
import { Props } from "react-select/src/Select";
import { Control } from "./Control";

export type SelectValue = {
  label: string;
  value: string;
};

export const Select: React.FC<Props> = ({ styles, ...props }) => (
  <ReactSelect
    styles={{
      placeholder: () => ({ display: "none" }),
      valueContainer: provided => ({ ...provided, padding: 0, height: 44 }),
      indicatorsContainer: () => ({ display: "none" }),
      menu: provided => ({
        ...provided,
        marginTop: 0
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#BBDEFB" : state.isFocused || state.isActive ? "#E3F2FD" : "transparent",
        fontWeight: 300,
        cursor: "pointer",
        fontSize: 16,
        padding: "14px 10px",
        color: "#1f2128"
      }),
      ...styles
    }}
    classNamePrefix="csa-select"
    components={{ Control }}
    {...props}
  />
);
