import React from "react";
import firebase from "./FirebaseAPI";

const withAuthProtection = redirectRoute => WrappedComponent => {
  class WithAuthProtection extends React.Component {
    componentDidMount() {
      const { history } = this.props;
      if (!firebase.auth().currentUser) {
        return history.push(redirectRoute);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { me, history } = this.props;
      const { me: nextMe } = nextProps;
      if (me && !nextMe) {
        return history.push(redirectRoute);
      }
    }

    render() {
      const { me } = this.props;
      if (!me) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthProtection;
};

export default withAuthProtection;
