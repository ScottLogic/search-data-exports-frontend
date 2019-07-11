import MockSearchResult0 from '../MockSearchResult0.json';
import MockSearchResult1 from '../MockSearchResult1.json';

export default request => {
  console.log('API Request:', request);
  return request.page === 0 ? MockSearchResult0 : MockSearchResult1;
};
