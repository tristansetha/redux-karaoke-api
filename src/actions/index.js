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

export function fetchLyrics(title, artist, musicMatchId, localSongId, dispatch) {
  return fetch('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + musicMatchId + '&apikey=0c5373b692119c16d6f3cf343722595c').then(
    response => response.json(),
    error => console.log('An error occurred.', error)
  ).then(function(json) {
    if (json.message.body.lyrics) {
      let lyrics = json.message.body.lyrics.lyrics_body;
      lyrics = lyrics.replace('"', '');
      const songArray = lyrics.split(/\n/g).filter(entry => entry!='');
      dispatch(receiveSong(title, artist, localSongId, songArray));
      dispatch(changeSong(localSongId));
    } else {
      console.log('We couldn\'t locate lyrics for this song!');
    }
  });
}


export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=0c5373b692119c16d6f3cf343722595c').then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      if (json.message.body.track_list.length > 0) {
        const musicMatchId = json.message.body.track_list[0].track.track_id;
        const artist = json.message.body.track_list[0].track.artist_name;
        const title = json.message.body.track_list[0].track.track_name;
        fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
      } else {
        console.log('We couldn\'t locate a song under that ID!');
      }
    });
  };
}

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export const receiveSong = (title, artist, songId, songArray) => ({
  type: types.RECEIVE_SONG,
  songId,
  title,
  artist,
  songArray,
  receivedAt: Date.now()
});

// Notice we're using then() to wait for code to finish before executing other code. We do this because contacting an API is asynchronous. That is, we must wait for the API response to return before we can execute any subsequent code that depends on that response.

// fetchSongId() is an async action: a Redux action performing an asynchronous task

//An action informing the reducers that the request began.
//An action informing the reducers that the request finished successfully. 
//An action informing the reducers that the request failed.

//FETCHSONGID
// We check if json.message.body.track_list is greater than 0 to confirm it contains data. This prevents our app from crashing if the API returns empty/bogus info.
// If it's empty we print an error message to the console.
// If it contains data we parse the artist, title and musicMatchId.
// Then we call a fetchLyrics() action, passing these details as parameters. This is the action that will query Musixmatch for lyrics corresponding to the Musixmatch ID.

// // Takes the 'title' from our form as argument:
// export function fetchSongId(title) {
//   //entire method returns a function
//   return function (dispatch) {
//     //create a local ID with uuid:
//     const localSongId = v4();
//     //replaces spaces in the user-provided song title with underscores, because our API URL contains spaces
//     title = title.replace(' ', '_');
//     //returns the result of the fetch function contacting the API endpoint, with our title parameters added to request URL
//     // .then() waits until code preceding it completes. So, code here
//     // will not run until fetch() returns data from the API:
//     return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=0c5373b692119c16d6f3cf343722595c').then(
//       // Retrieves JSON response from API:
//       response => response.json(),
//       // Prints any errors to the console IF call is unsuccessful:
//       error => console.log('An error occurred.', error)
//       // Waits until code preceding it finishes to run.
//       // The return value from first then() block (API response) is passed to second
//       // .then() block as parameter 'json':
//     ).then(function(json) {
//       if (json.message.body.track_list.length > 0) {
//         const musicMatchId = json.message.body.track_list[0].track.track_id;
//         const artist = json.message.body.track_list[0].track.artist_name;
//         const title = json.message.body.track_list[0].track.track_name;
//         fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
//       } else {
//         console.log('We couldn\'t locate a song under that ID!');
//       }
//     });   
//   };
// }
