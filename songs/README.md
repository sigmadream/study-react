# React-Redux Tutorial

# 이 튜토리얼의 목적

React와 Redux의 작동방법이 아니라, 작성방법을 기준으로 튜토리얼을 진행

```
React <-> React-Redux <-> Redux
```

# 준비사항

Redux 라이브러리를 사용할 수 있어야 하며, 기본적인 Redux에 대한 개념은 알아야 함

# 튜토리얼

## Step1, 프로젝트 시작하기

```
$ npx create-react-app react-redux-tutorial
$ yarn add redux react-redux
```

## Step2

- `src` 폴더에 있는 모든 파일 삭제
- `public/index.html`에 자신이 잘 사용할 수 있는 CSS 프레임워크 추가

## Step3

- `src/index.js` 파일 작성

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));
```

- `src/components/App.js` 파일 작성

```
import React from 'react';
import SongList from './SongList';

const App = () => {
  return <div>App</div>
};

export default App;

```

## Step4

만약, Redux 없이 해당 프로젝트를 만든다면, 아래와 같은 데이터 흐름을 가지게 됨
App -> Props{List Of Songs, onSongSelect} -> SongList
App -> Props{Selected song} -> SongDetail

Redux를 사용하게 된다면 아래와 같은 형태의 데이터 흐름을 가짐

- Reducers
  - song list
  - selected song
- Action
  - select song

React-Redux를 연결한다면 아래와 같은 데이터 흐름을 가짐

- [Store]
  - [Reducers]
    - song list
    - selected song
- [Provider]
- App
- [Connect]
- SongList

- [Action]
  - Select Song

## Step5

`src/actions/index.js`에 Action을 작성

```
export const selectSong = (song) => {
  return {
    type: 'SONG_SELECTED',
    payload: song,
  };
};
```

## Step6

```
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
```

## Step7

`src/index.js` 수정

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

```

## Step8

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongList extends Component {
  render() {
    console.log(this.props);
    return <div>SongList</div>
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { songs: state.songs }
};

export default connect(mapStateToProps)(SongList);

```

## Step9

```
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


```

Step10

```
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

```
