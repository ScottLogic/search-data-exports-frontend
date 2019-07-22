import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import Header from "../header/Header";
import ReactPaginate from "react-paginate";
import ResultList from "../list/ResultList";
import ExportResultsModal from "../modal/ExportResultsModal";
import LoadingSpinner from '../../utilities/LoadingSpinner';

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
  handleModalSubmit,
  isLoading
}) => {
  const exportButton = data.length ? (
    <div>
      <button id="exportResultsButton" onClick={handleExportClick}>Export Results</button>
    </div>
  ) : ("");
  return (
    <div className="app">
      <Header email="oforeman@scottlogic.com" />
      <div className="paper-display-page">
        <div className="container-index-select-form">
          <form onSubmit={handleSearch}>    
            <span className="searchInputs">
              <input name="searchInput" placeholder="Input search criteria" type="text" {...searchCriteria} required />
              <input type="submit" value="Search" />
            </span>
          </form>
        </div>
        {exportButton}

        <LoadingSpinner isDisplayed={isLoading} />

        <div className="container-result-list">
          <ResultList data={data} />
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
          showDirectDownloadOption={totalHitsCount < (process.env.REACT_APP_DIRECT_DOWNLOAD_LIMIT || 100)}
          submitCallback={handleModalSubmit}
          closeCallback={handleModalClose}
        />
      </div>
    </div>
  );
};

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
  handleModalSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default App;
