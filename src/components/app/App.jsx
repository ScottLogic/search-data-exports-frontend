import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import Header from "../header/Header";
import ReactPaginate from "react-paginate";
import ResultList from "../list/ResultList";
import ExportResultsModal from "../modal/ExportResultsModal";

const App = ({
  data,
  currentPage,
  maxPages,
  searchCriteria,
  handleSearch,
  handlePageChange,
  handleExportClick,
  showModal,
  totalHitsCount,
  handleModalClose,
  handleModalSubmit
}) => (
  <div className="app">
    <Header email="oforeman@scottlogic.com" />
    <div className="paper-display-page">
      <div className="container-index-select-form">
        <form onSubmit={handleSearch}>
          <div>
            <input type="radio" id="userPostSearch" name="indexSearch" value="" defaultChecked />
            <label htmlFor="userPostSearch">Both</label>
            <input type="radio" id="userSearch" name="indexSearch" value="user" />
            <label htmlFor="userSearch">User</label>
            <input type="radio" id="postSearch" name="indexSearch" value="post" />
            <label htmlFor="postSearch">Post</label>
          </div>
          <input name="searchInput" placeholder="Input search criteria" type="text" {...searchCriteria} required />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="container-result-list">
        <ResultList data={data} handleExportClick={handleExportClick} />
      </div>

      <ReactPaginate
        pageCount={maxPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        containerClassName={"pagination"}
        activeClassName={"active"}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
      <ExportResultsModal
        showModal={showModal}
        showDirectDownloadOption={totalHitsCount < 100}
        submitCallback={handleModalSubmit}
        closeCallback={handleModalClose}
      />
    </div>
  </div>
);

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  searchCriteria: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleExportClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  totalHitsCount: PropTypes.number.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleModalSubmit: PropTypes.func.isRequired
};

export default App;
