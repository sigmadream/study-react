import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserHeader extends Component {
  componentDidMount() {
    console.log('UserHeader - componentDidMount');
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
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
