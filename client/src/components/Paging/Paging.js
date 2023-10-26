import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({ activePage, totalItemsCount, onPageChange, itemsPerPage }) => {
  // Define itemsPerPage here

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      firstPageText={"‹‹"}
      nextPageText={"›"}
      lastPageText={"››"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;