import React from 'react';
import PropTypes from 'prop-types';

require('./loading.scss');

const Loading = ({title}) => (
  <div className="loading-wrapper text-center">
    <div className="loading">
      <div className="loading-icon">
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>
      <div className="loading-title">
        {title}
      </div>
    </div>
  </div>
);

Loading.propTypes = {
  title: PropTypes.string
};

Loading.defaultProps = {
  title: ''
};

export default Loading;