import React from "react";
import Box from "@material-ui/core/Box";
import { default as MaterialPagination } from "@material-ui/lab/Pagination";

type PaginationProps = {
  lastPage: number;
  updateCurrentPage: any;
  currentPage: number;
};

export default function Pagination({
  lastPage,
  updateCurrentPage,
  currentPage,
}: PaginationProps) {
  return (
    <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
      <MaterialPagination
        count={lastPage}
        page={currentPage}
        color="primary"
        onChange={updateCurrentPage}
      />
    </Box>
  );
}
