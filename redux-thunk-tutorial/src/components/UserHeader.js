import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends Component {
  componentDidMount() {
    console.log('UserHeader - componentDidMount');
    this.props.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('UserHeader - componentDidUpdate');
  }

  render() {
    const user = this.props.users.find((user) => user.id === this.props.userId);
    console.log('UserHeader - render');
    if (!user) {
      return null;
    }
    return <div>UserName is {user.name}</div>;
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUser: fetchUser })(UserHeader);
