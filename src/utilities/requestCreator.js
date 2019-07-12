export const createRequest = (type, results, page, searchVal) => {
  return {
    type,
    results,
    page,
    search: [
      { field: 'all', value: searchVal }
    ]
  };
};

export const updateRequestPage = (request, page) => {
  return {
    ...request,
    page
  }
};
