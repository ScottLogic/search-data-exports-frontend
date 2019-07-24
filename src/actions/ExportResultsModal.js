export const DISPLAY_EXPORT_RESULTS_MODAL_UPDATED = 'DISPLAY_EXPORT_RESULTS_MODAL_UPDATED';

export const displayExportResultsModalUpdated = isDisplayed => ({
  type: DISPLAY_EXPORT_RESULTS_MODAL_UPDATED,
  payload: isDisplayed
});
