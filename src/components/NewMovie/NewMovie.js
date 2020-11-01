import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';

export class NewMovie extends Component {
  title = React.createRef();

  description = React.createRef();

  imgUrl = React.createRef();

  imdbUrl = React.createRef();

  imdbId = React.createRef();

  movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { movie } = this;
    const { onAdd } = this.props;

    Object.keys(movie).forEach((key) => {
      movie[key] = this[key].current.value;
      this[key].current.value = '';
    });

    onAdd(movie);
  }

  render() {
    const { onSubmit, movie } = this;

    return (
      <Form
        onSubmit={onSubmit}
      >
        <h1>Add new movie</h1>

        {Object.keys(movie).map(field => (
          <Form.Group key={Math.random()}>
            <Form.Label
              htmlFor="movieTitle"
              className="text-capitalize"
            >
              {field}
            </Form.Label>

            <Form.Control
              type="text"
              name={field}
              placeholder={`Enter ${field}`}
              id={`movie${field}`}
              className="text-capitalize"
              ref={this[field]}
            />
          </Form.Group>
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
