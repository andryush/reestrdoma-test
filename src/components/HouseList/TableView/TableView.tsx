import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "../Pagination/Pagination";
import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { dateConverter } from "../../../helpers/dateConverter";
const useStyles = makeStyles({
  root: {
    margin: "20px 20px",
  },
  table: {
    minWidth: 650,
  },
  info: {
    padding: "20px",
    textAlign: "center",
  },
  progress: {
    marginTop: "100px",
  },
});

type HousesProps = {
  houses: any;
  lastPage: number;
  updateCurrentPage: Function;
  isLoading: boolean;
  currentPage: number;
};

export default function TableView({
  houses,
  lastPage,
  updateCurrentPage,
  isLoading,
  currentPage,
}: HousesProps) {
  const classes = useStyles();

  return (
    <div>
      {!isLoading ? (
        <Box minWidth="650px" mt={5}>
          {houses.length > 0 ? (
            <Box>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Дома</TableCell>
                      <TableCell align="left">Адрес</TableCell>
                      <TableCell align="right">Количество квартир</TableCell>
                      <TableCell align="right">Дата добавления</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {houses.map((house: any) => {
                      return (
                        <TableRow key={house.id}>
                          <TableCell component="th" scope="row">
                            {house.id}
                          </TableCell>
                          <TableCell align="left">{house.address}</TableCell>
                          <TableCell align="right">
                            {house.reestrFlatCount}
                          </TableCell>
                          <TableCell align="right">
                            {dateConverter(house.createdAt)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                lastPage={lastPage}
                updateCurrentPage={updateCurrentPage}
                currentPage={currentPage}
              />
            </Box>
          ) : (
            <h3 className={classes.info}>Nothing found</h3>
          )}
        </Box>
      ) : (
        <CircularProgress className={classes.progress} size={100} />
      )}
    </div>
  );
}
