export const createRequest = (type, results, page, searchVal) => ({
  type,
  results,
  page,
  search: [{ field: 'all', value: searchVal }]
});

export const updateRequestPage = (request, page) => ({
  ...request,
  page
});
