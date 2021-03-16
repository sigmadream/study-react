import { combineReducers } from 'redux';

const songReducer = () => {
  return [
    { title: 'Drivers License', duration: '1:01' },
    { title: 'Up', duration: '2:02' },
    { title: 'Go Crazy', duration: '3:03' },
    { title: '34+35', duration: '4:04' },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songReducer,
  selectedSong: selectedSongReducer,
});
