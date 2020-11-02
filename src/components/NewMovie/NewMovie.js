import React, { Component } from 'react';
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

  returnObj = () => (
    {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdId: this.state.imdbId,
    }
  )

  addForm = (event) => {
    event.preventDefault();
    this.props.addMovie(this.returnObj())
    this.setState(this.emptyState)
  }

  render() {
    return (
      <Form onSubmit={this.addForm}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
          name="title"
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
          required={1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
            required={1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>imgUrl</Form.Label>
          <Form.Control
            name="imgUrl"
            type="text"
            placeholder="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            required={1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>imdbUrl</Form.Label>
          <Form.Control
            name="imdbUrl"
            type="text"
            placeholder="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            required={1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>imdbId</Form.Label>
          <Form.Control
            name="imdbId"
            type="text"
            placeholder="imdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
        >
          Add movie
        </Button>
      </Form>
    );
  }
}
