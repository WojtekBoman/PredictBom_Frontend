import React from "react";
import { connect } from "react-redux";
import ChangePasswordWithTokenPage from "./ChangePasswordWithTokenPage";
import CheckTokenPage from "./CheckTokenPage";

class ResetPasswordWithToken extends React.Component {
  render() {
    if (this.props.isTokenCorrect) {
      return (
        <div>
          <ChangePasswordWithTokenPage />
        </div>
      );
    }

    return (
      <div>
        <CheckTokenPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isTokenCorrect: state.token.tokenCorrect };
};

export default connect(mapStateToProps)(ResetPasswordWithToken);
