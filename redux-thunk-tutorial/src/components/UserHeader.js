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
    const { user } = this.props;
    console.log('UserHeader - render');
    if (!user) {
      return null;
    }
    return <div>UserName is {user.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { users: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps, { fetchUser: fetchUser })(UserHeader);
