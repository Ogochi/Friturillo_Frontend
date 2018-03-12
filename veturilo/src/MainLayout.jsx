import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <h1>Main Layout</h1>
        {this.props.children}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;