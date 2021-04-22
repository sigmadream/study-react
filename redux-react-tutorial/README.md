# React-Redux Tutorial

## 소개

React와 Redux의 작동방법이 아니라, 작성방법을 기준으로 튜토리얼을 진행하면서 작성한 저장소 입니다.

```
React <-> React-Redux <-> Redux
```

## 준비사항

Redux 라이브러리를 사용할 수 있어야 하며, 기본적인 Redux에 대한 개념은 알아야 함

## 튜토리얼

### Step 1, 프로젝트 시작하기

```
$ npx create-react-app react-redux-tutorial
$ yarn add redux react-redux
```

## Step 2, 프로젝트 초기화

- `src` 폴더에 있는 모든 파일 삭제
- `public/index.html`에 자신이 잘 사용할 수 있는 CSS 프레임워크 추가

## Step 3, React 및 ReactDOM 설정

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

## Step 4, 데이터 흐름

- App -> Props{List Of Songs, onSongSelect} -> SongList
- App -> Props{Selected song} -> SongDetail

## Step 5, Action 작성

`src/actions/index.js`에 Action을 작성

```
export const selectSong = (song) => {
  return {
    type: 'SONG_SELECTED',
    payload: song,
  };
};
```

## Step 6, Reducer 작성

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

## Step 7, Store 및 Provide 설정

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

## Step 8, 컴포넌트와 연결

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

## Step 9, 컴포넌트 작성

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

## Step 10, hook 기반 컴포넌트

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
