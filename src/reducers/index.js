import { combineReducers } from 'redux';
import songChangeReducer from './songChangeReducer';
import lyricChangeReducer from './lyricChangeReducer';
// import * as actions from './../../src/actions';

const rootReducer = combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer
});

export default rootReducer;
