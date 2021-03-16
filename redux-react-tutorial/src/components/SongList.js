import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component {
  renderList() {
    return this.props.songs.map((song) => {
      return (
        <div className="row gy-1" key={song.title}>
          <div className="col">{song.title}</div>
          <div className="col">
            <button
              onClick={() => this.props.selectSong(song)}
              className="btn btn-primary"
            >
              Select
            </button>
          </div>
        </div>
      );
    });
  }
  render() {
    console.log(this.props);
    return <div className="row">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { songs: state.songs };
};

export default connect(mapStateToProps, { selectSong })(SongList);
