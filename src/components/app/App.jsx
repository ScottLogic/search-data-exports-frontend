import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import Header from '../header/HeaderContainer';
import ResultList from '../list/ResultList';
import ExportResultsModal from '../modal/ExportResultsModalContainer';
import LoadingSpinner from '../reusableComponents/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import ReportsModal from '../reports/ReportsModalContainer';
import NewPostModal from '../newPost/NewPostModalContainer';
import DigestModal from '../digestModal/DigestModalContainer';
import DigestListModal from '../digestListModal/DigestListModalContainer';
import ModalController from '../modalController/ModalControllerContainer';
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
  fetchSearchResults
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

  const pageNavigationClass = isLoading ? 'pages loading' : 'pages';

  return (
    <div className="app">
      <Header />
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

        <ModalController hasData={data.length > 0} searchPerformed={lastRequest} />
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
        <DigestModal />
        <DigestListModal />
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
  fetchSearchResults: PropTypes.func.isRequired
};

export default App;
