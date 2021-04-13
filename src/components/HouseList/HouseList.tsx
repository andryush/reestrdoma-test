import React from "react";
import TableView from "./TableView/TableView";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  form: {
    width: "30%",
  },
}));

type CompaniesProps = {
  companies: any;
  selectedCompany: number;
  updateSelectedCompany: Function;
  updateCurrentPage: Function;
  houses: any;
  lastPage: number;
  isLoading: boolean;
  currentPage: number;
};

export default function HouseList({
  companies,
  selectedCompany,
  updateSelectedCompany,
  updateCurrentPage,
  houses,
  lastPage,
  isLoading,
  currentPage,
}: CompaniesProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Please select company</h2>
      <FormControl variant="outlined" className={classes.form}>
        <InputLabel id="company-label">Company</InputLabel>
        <Select
          labelId="company-label"
          id="demo-simple-select-outlined"
          label="Company"
          defaultValue=""
          value={selectedCompany === 0 ? "" : selectedCompany}
          onChange={(e) => updateSelectedCompany(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {companies.length > 0
            ? companies.map((company: any) => {
                return (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </FormControl>
      {selectedCompany > 0 ? (
        <TableView
          houses={houses}
          lastPage={lastPage}
          updateCurrentPage={updateCurrentPage}
          isLoading={isLoading}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
}
