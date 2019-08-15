export const createRequest = (type, results, page, value) => ({
  type,
  results,
  page,
  search: [{ value }]
});

export const updateRequestPage = (request, page) => ({
  ...request,
  page
});
