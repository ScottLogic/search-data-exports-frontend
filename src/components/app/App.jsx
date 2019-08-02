import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import Header from '../header/Header';
import ResultList from '../list/ResultList';
import ExportResultsModal from '../modal/ExportResultsModalContainer';
import LoadingSpinner from '../reusableComponents/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import ReportsModal from '../reports/ReportsModalContainer';
import NewPostModal from '../newPost/NewPostModalContainer';
import useInputForm from '../../utilities/hooks';
import {
  createRequest,
  updateRequestPage
} from '../../utilities/requestCreator';

const App = ({
  data,
  maxPages,
  currentPage,
  lastRequest,
  isLoading,
  setCurrentPage,
  setLastRequest,
  fetchSearchResults,
  showExportResultsModal,
  showReportsModal,
  showNewPostModal
}) => {
  const searchCriteria = useInputForm('');

  const handlePageChange = ({ selected }) => {
    const request = updateRequestPage(lastRequest, selected);
    setCurrentPage(selected);
    fetchSearchResults(request);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(0);

    const request = createRequest('post', 10, 0, searchCriteria.value);
    setLastRequest(request);
    fetchSearchResults(request);
  };

  const exportButton = data.length ? (
    <input
      type="button"
      id="exportResultsButton"
      onClick={showExportResultsModal}
      value="Export Results"
    />
  ) : (
    ''
  );

  const pageNavigationClass = isLoading ? 'pages loading' : 'pages';

  return (
    <div className="app">
      <Header email="oforeman@scottlogic.com" />
      <div className="paper-display-page">
        <div className="container-index-select-form">
          <form onSubmit={handleSearch}>
            <span className="searchInputs">
              <input
                name="searchInput"
                placeholder="Input search criteria"
                type="text"
                {...searchCriteria}
                required
              />
              <input type="submit" value="Search" disabled={isLoading} />
            </span>
          </form>
        </div>

        <div className="container-index-options">
          <input
            type="button"
            id="addPostButton"
            onClick={showNewPostModal}
            value="Add Post"
          />
          {exportButton}
          <input
            type="button"
            id="showReportsButton"
            onClick={showReportsModal}
            value="Reports"
          />
        </div>

        <LoadingSpinner isDisplayed={isLoading} />

        <div className="container-result-list">
          <ResultList data={data} />
        </div>

        <ReactPaginate
          pageCount={maxPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          breakClassName={pageNavigationClass}
          previousClassName={pageNavigationClass}
          nextClassName={pageNavigationClass}
          pageClassName={pageNavigationClass}
          containerClassName="pagination"
          activeClassName="active"
          onPageChange={handlePageChange}
          forcePage={currentPage}
        />
        <ExportResultsModal />
        <ReportsModal />
        <NewPostModal />
        <ToastContainer position="bottom-center" hideProgressBar newestOnTop />
      </div>
    </div>
  );
};

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  lastRequest: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setLastRequest: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  showExportResultsModal: PropTypes.func.isRequired,
  showReportsModal: PropTypes.func.isRequired,
  showNewPostModal: PropTypes.func.isRequired
};

export default App;
