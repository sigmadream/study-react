import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

const SongDetail = ({ song }) => {
  if (!song) {
    return <div>Song Detail</div>;
  }

  return (
    <div>
      <h3>{song.title}</h3>
      <h3>{song.duration}</h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
