import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';

export class NewMovie extends Component {
  title = React.createRef();

  description = React.createRef();

  imgUrl = React.createRef();

  imdbUrl = React.createRef();

  imdbId = React.createRef();

  onSubmit = (event) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const movie = {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    Object.keys(movie).forEach((key) => {
      movie[key] = this[key].current.value;
      this[key].current.value = '';
    });

    onAdd(movie);
  }

  render() {
    const {
      onSubmit,
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this;

    return (
      <Form
        onSubmit={onSubmit}
      >
        <h1>Add new movie</h1>

        <Form.Group>
          <Form.Label htmlFor="movieTitle">Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            id="movieTitle"
            ref={title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="movieDescription">Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter description"
            id="movieDescription"
            ref={description}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="movieImgUrl">ImgUrl</Form.Label>
          <Form.Control
            type="text"
            name="imgUrl"
            placeholder="Enter ImgUrl"
            id="movieImgUrl"
            ref={imgUrl}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="movieImdbUrl">ImdbUrl</Form.Label>
          <Form.Control
            type="text"
            name="imdbUrl"
            placeholder="Enter ImdbUrl"
            id="movieImdbUrl"
            ref={imdbUrl}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="movieImdbId">ImdbId</Form.Label>
          <Form.Control
            type="text"
            name="imdbId"
            placeholder="Enter ImdbId"
            id="movieImdbId"
            ref={imdbId}
          />
        </Form.Group>

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
