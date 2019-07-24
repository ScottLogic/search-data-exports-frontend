const root = state => state.exportResultsModal;

export const getModalDisplayed = state => root(state).modalDisplayed;