import { filterValueRegex } from "../constants/regex";

export const transformFilterValue = (value: string) => {
    return value.toLocaleLowerCase().replace(filterValueRegex, "");
};
