export const UPDATE_MODAL_DISPLAYED = 'UPDATE_MODAL_DISPLAYED';

export const updateModalDisplayed = isDisplayed => ({
  type: UPDATE_MODAL_DISPLAYED,
  payload: isDisplayed
});
