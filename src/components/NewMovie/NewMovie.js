import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: '',
  };

  handleControlChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
      case 'description':
      case 'imgUrl':
      case 'imdbUrl':
      case 'imdbId':
        return (this.setState({
          [name]: value,
          error: '',
        }));
      default: return 'SomethigWrong';
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title.length
      || !this.state.description.length
      || !this.state.imgUrl.length
      || !this.state.imdbUrl.length
      || !this.state.imdbId.length) {
      this.setState({
        error: 'Fill please all filds',
      });

      return;
    }

    const movie = {
      description: this.state.description,
      imdbId: this.state.imdbId,
      imdbUrl: this.state.imdbUrl,
      imgUrl: this.state.imgUrl,
      title: this.state.title,
    };

    this.props.addMovie(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      error: '',
    });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicTitle"
          >
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={this.state.title}
              name="title"
              type="text"
              placeholder="Enter title"
              onChange={this.handleControlChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={this.state.description}
              name="description"
              type="text"
              placeholder="Enter description"
              onChange={this.handleControlChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImgUrl">
            <Form.Label>Img Url</Form.Label>
            <Form.Control
              value={this.state.imgUrl}
              name="imgUrl"
              type="text"
              placeholder="Enter Image Url"
              onChange={this.handleControlChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImdbUrl">
            <Form.Label>Imdb Url</Form.Label>
            <Form.Control
              value={this.state.imdbUrl}
              name="imdbUrl"
              type="text"
              placeholder="Enter Database Url"
              onChange={this.handleControlChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImdbId">
            <Form.Label>Imdb Id</Form.Label>
            <Form.Control
              value={this.state.imdbId}
              name="imdbId"
              type="text"
              placeholder="Enter Database Id"
              onChange={this.handleControlChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
          <Form.Group>
            {this.state.error
            && <Alert variant="danger">{this.state.error}</Alert>
            }
          </Form.Group>
        </Form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
