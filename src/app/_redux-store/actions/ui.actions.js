export const types = {
  ORIGIN_INPUT_FOCUSED: 'ORIGIN_INPUT_FOCUSED',
  ORIGIN_INPUT_BLUR: 'ORIGIN_INPUT_BLUR',
  ORIGIN_SELECTED: 'ORIGIN_SELECTED',
  DESTINATION_INPUT_FOCUSED: 'DESTINATION_INPUT_FOCUSED',
  DESTINATION_INPUT_BLUR: 'DESTINATION_INPUT_BLUR',
  DESTINATION_SELECTED: 'DESTINATION_SELECTED',
  GET_STARTED_CLICKED: 'GET_STARTED_CLICKED'
};

export function getStartedClicked() {
  return {
    type: types.GET_STARTED_CLICKED
  };
}

export function originInputFocused() {
  return {
    type: types.ORIGIN_INPUT_FOCUSED
  };
}

export function originInputBlurred() {
  return {
    type: types.ORIGIN_INPUT_BLUR
  };
}

export function destinationInputFocused() {
  return {
    type: types.DESTINATION_INPUT_FOCUSED
  };
}

export function destinationInputBlurred() {
  return {
    type: types.DESTINATION_INPUT_BLUR
  };
}
