const root = state => state.reportsModal;

export const getModalDisplayed = state => root(state).modalDisplayed;
