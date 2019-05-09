import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

// Takes the 'title' from our form as argument:
export function fetchSongId(title) {
  //entire method returns a function
  return function (dispatch) {
    //create a local ID with uuid:
    const localSongId = v4();
    //replaces spaces in the user-provided song title with underscores, because our API URL contains spaces
    title = title.replace(' ', '_');
    //returns the result of the fetch function contacting the API endpoint, with our title parameters added to request URL
    // .then() waits until code preceding it completes. So, code here
    // will not run until fetch() returns data from the API:
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=YOUR-API-KEY-HERE').then(
    // Retrieves JSON response from API:
      response => response.json(),
    // Prints any errors to the console IF call is unsuccessful:
      error => console.log('An error occurred.', error)
    // Waits until code preceding it finishes to run.
    // The return value from first then() block (API response) is passed to second
    // .then() block as parameter 'json':
    ).then(function(json) {
    // prints API response to console.
      console.log('CHECK OUT THIS SWEET API RESPONSE:', json)
    });   
  };
}

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

// Notice we're using then() to wait for code to finish before executing other code. We do this because contacting an API is asynchronous. That is, we must wait for the API response to return before we can execute any subsequent code that depends on that response.

// fetchSongId() is an async action: a Redux action performing an asynchronous task

//An action informing the reducers that the request began.
//An action informing the reducers that the request finished successfully. 
//An action informing the reducers that the request failed.