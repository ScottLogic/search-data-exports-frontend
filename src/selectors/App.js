const root = state => state.app;

export const getData = state => root(state).data;

export const getTotalHitsCount = state => root(state).totalHitsCount;

export const getMaxPages = state => root(state).maxPages;

export const getCurrentPage = state => root(state).currentPage;

export const getLastRequest = state => root(state).lastRequest;

export const getIsLoading = state => root(state).isLoading;
