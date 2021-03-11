import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (
      !title
      || !description
      || !imgUrl
      || !imdbUrl
      || !imdbId
    ) {
      return;
    }

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
  }

  render() {
    const {
      title,
      description,
      imgUrl, imdbUrl,
      imdbId,
    } = this.state;

    return (
      <Form
        onSubmit={this.handleSubmit}
        success
      >
        <Form.Group widths="equal">
          <Form.Input
            transparent
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <TextArea
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            transparent
            placeholder="ImgUrl"
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <Form.Input
            transparent
            placeholder="ImdbUrl"
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Input
          transparent
          placeholder="ImdbId"
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <Form.Button>
          Add Film
        </Form.Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
