const rootURL = `${process.env.REACT_APP_API_URL || ''}`;

export const SEARCH_REQUEST_URL = `${rootURL}/search/`;

export const DOWNLOAD_REQUEST_URL = `${rootURL}/download-request`;

export const REPORT_STATUS_URL = `${rootURL}/report-status`;

export const GRAPHICAL_REQUEST_URL = `${rootURL}/report/graphical`;

export const HYBRID_REQUEST_URL = `${rootURL}/report/hybrid`;

export const NEW_POST_URL = `${rootURL}/posts/`;

export const WEBSOCKET_ENDPOINT = `${process.env.REACT_APP_WEBSOCKET_ENDPOINT || ''}`;
