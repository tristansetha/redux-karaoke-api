import React from 'react';
import { connect } from 'react-redux';

function SongSearch(){
  let input;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(fetchSongId(input.value.trim()));
        // ...we'll add more custom logic here later...
        console.log('SEARCHED ARTIST:');
        console.log(input.value.trim());
        //...instead of these console.log()s....
        input.value = '';
      }}>
        <input placeholder="Song Title" ref={node => {
          input = node;
        }}></input>
        <button>Search</button>
      </form>
    </div>
  );
}

SongSearch.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(SongSearch);
