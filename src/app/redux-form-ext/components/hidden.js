import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

class renderField extends Component {
  render() {
    const {
      input,
      meta: { dirty, touched, error, warning, valid },
      showNotifications,
    } = this.props;

    const inputStyles = classNames(
      {
        'valid': (valid),
        'invalid': (!valid)
      }
    );

    return (
      <div className="form-control-hidden">
        <input type="hidden" {...input} />
        {showNotifications && (
          <div>{this.renderNotification(touched, error, warning)}</div>
        )}
      </div>
    );
  }

  renderNotification(touched, error, warning) {
    if (error) {
      return (<span className="error"><i className="fa fa-times-circle"></i>&nbsp;{error}</span>);
    }

    if (warning) {
      return (<span className="warning"><i className="fa fa-exclamation-triangle"></i>&nbsp;{warning}</span>);
    }

    return null;
  }
}

const Hidden = (props) => (
  <Field component={renderField} {...props} />
)

Hidden.propTypes = {
  name: PropTypes.string.isRequired,
  showNotifications: PropTypes.bool,
}

Hidden.defaultProps = {
  showNotifications: true,
};

export default Hidden;