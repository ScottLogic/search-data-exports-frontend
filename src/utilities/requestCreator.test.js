import { createRequest, updateRequestPage } from './requestCreator';

describe('Request Creator', () => {
  const type = 'user';
  const results = 10;
  const page = 0;
  const value = 'Test Search';

  it('createRequest returns an API request object', () => {
    const expectedRequest = {
      type,
      results,
      page,
      search: [{ value }]
    };

    const request = createRequest(type, results, page, value);

    expect(request).toEqual(expectedRequest);
  });

  it('updateRequestPage returns the given request with the updated page', () => {
    const newPage = 1;
    const initialRequest = {
      type,
      results,
      page,
      search: [{ value }]
    };
    const expectedRequest = {
      type,
      results,
      page: newPage,
      search: [{ value }]
    };

    const request = updateRequestPage(initialRequest, newPage);

    expect(request).toEqual(expectedRequest);
  });
});
