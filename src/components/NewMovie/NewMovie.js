import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react';

const validator
  // eslint-disable-next-line max-len
  = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      imdbUrl: false,
      imgUrl: false,
      isTitle: false,
      isImdbId: false,
      isButtonDisable: false,
    },

  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errors: {
        isButtonDisable: false,
      },
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

    if (!validator.test(imdbUrl)) {
      this.setState({
        errors: {
          imdbUrl: true,
          isButtonDisable: true,
        },
      });

      return;
    }

    if (!validator.test(imgUrl)) {
      this.setState({
        errors: {
          imgUrl: true,
          isButtonDisable: true,
        },
      });

      return;
    }

    if (
      !title
      || !imgUrl
      || !imdbUrl
      || !imdbId
    ) {
      this.setState(prevState => ({
        errors: {
          imdbId: !prevState.imdbId,
          imdbUrl: true,
          title: !prevState.title,
          imgUrl: !prevState.imgUrl,
          isButtonDisable: true,
        },
      }));

      return;
    }

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        imdbUrl: false,
        imgUrl: false,
        isTitle: false,
        isImdbId: false,
      },
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
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
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
            error={errors.title && {
              content: 'Please enter title',
              pointing: 'below',
            }}
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
            type="text"
            name="imgUrl"
            value={imgUrl}
            error={!validator.test(imgUrl) && {
              content: 'Please enter a valid url',
              pointing: 'below',
            }}
            onChange={this.handleChange}
          />
          <Form.Input
            transparent
            placeholder="ImdbUrl"
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            error={!validator.test(imdbUrl) && {
              content: 'Please enter a valid url',
              pointing: 'below',
            }}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Input
          transparent
          placeholder="ImdbId"
          type="text"
          name="imdbId"
          value={imdbId}
          error={errors.imdbId && {
            content: 'Please enter imdb Id',
            pointing: 'below',
          }}
          onChange={this.handleChange}
        />

        <Form.Button disabled={errors.isButtonDisable === true}>
          Add Film
        </Form.Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
