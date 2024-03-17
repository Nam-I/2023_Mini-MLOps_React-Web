import React from "react";
import Box from "@mui/material/Box";
import { Pagination } from "@mui/material";

const Paging = ({ currentPage, totalElements, size, handlePageChange }) => {
  return (
    <div class="card" id="pagingDiv">
      <nav aria-label="Page navigation example" id="fontList">
        <Box
          sx={{
            margin: "auto",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Pagination
            count={
              totalElements % size == 0
                ? Math.round(totalElements / size)
                : Math.round(totalElements / size) + 1
            }
            page={currentPage + 1}
            showFirstButton
            showLastButton
            variant="outlined"
            color="primary"
            onChange={handlePageChange}
          />
        </Box>
      </nav>
    </div>
  );
};

export default Paging;
