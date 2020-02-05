import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {};

  render() {
    const { onAdd } = this.props;

    return (
      <form>
        {onAdd && (
          <h1>The form should be here</h1>
        )}
        { /* TODO: create new movie form */ }
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
