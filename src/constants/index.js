import * as types from './ActionTypes';
import { initialState } from './InitialState';

export default {
  initialState: initialState,
  types: types
};

//our new ActionTypes.js file with constants containing our various actions' type properties
// import these into our src/constants/index.js module index, which will make them available to the rest of the application.