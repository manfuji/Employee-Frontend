import React, { Component, Fragment } from "react";
import { toast } from  'react-toastify';
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) toast.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) toast.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        toast.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        toast.error(error.msg.non_field_errors.join());
      if (error.msg.username) toast.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.deletePost) toast.success(message.deleteLead);
      if (message.addPost) toast.success(message.addLead);
      if (message.passwordNotMatch) toast.error(message.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(Alerts);
