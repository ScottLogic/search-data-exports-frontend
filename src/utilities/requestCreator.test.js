import { createRequest, updateRequestPage } from './requestCreator';

describe('Request Creator', () => {
  const type = 'user';
  const results = 10;
  const page = 0;
  const searchVal = 'Test Search';

  it('createRequest returns an API request object', () => {
    const expectedRequest = {
      type,
      results,
      page,
      search: [
        { field: 'all', value: searchVal }
      ]
    };

    const request = createRequest(type, results, page, searchVal);

    expect(request).toEqual(expectedRequest);
  });

  it('updateRequestPage returns the given request with the updated page', () => {
    const newPage = 1;
    const initialRequest = {
      type,
      results,
      page,
      search: [
        { field: 'all', value: searchVal }
      ]
    };
    const expectedRequest = {
      type,
      results,
      page: newPage,
      search: [
        { field: 'all', value: searchVal }
      ]
    };

    const request = updateRequestPage(initialRequest, newPage);

    expect(request).toEqual(expectedRequest);
  });
});
