import React, { Component } from 'react';
import { Inputs } from '../Inputs';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  emptyState = Object.assign(this.state)

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addForm = (event) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state })
    this.setState(this.emptyState)
  }

  render() {
    return (
      <Form onSubmit={this.addForm}>
        <Inputs
          state={this.state}
          changeHandler={this.handleChange}
        />

        <Button
          type="submit"
          variant="primary"
        >
          Add Movie
        </Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
