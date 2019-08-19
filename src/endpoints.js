export const SEARCH_REQUEST = '/search';

export const DOWNLOAD_REQUEST = '/download-request';

export const REPORT_STATUS = '/report-status';

export const GRAPHICAL_REQUEST = '/report/graphical';

export const HYBRID_REQUEST = '/report/hybrid';

export const NEW_POST = '/posts';

export const DIGEST_SUBSCRIPTIONS = '/subscriptions/daily';

export const REALTIME_SUBSCRIPTIONS = '/subscriptions/real-time';

export const WEBSOCKET_ENDPOINT = `${process.env.REACT_APP_WEBSOCKET_ENDPOINT || ''}`;
