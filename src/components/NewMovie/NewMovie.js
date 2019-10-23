import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {

  };

  render() {
    const { onAdd } = this.props;

    return (
      <form>
        { /* TODO: create new movie form */ }
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
