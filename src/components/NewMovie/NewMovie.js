import React, { Component } from 'react';
import './NewMovie.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormControl } from '../FormControl/FormControl';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeInputValue = (name, item) => {
    this.setState({ [name]: item.value });
  }

  addAll = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    if ((title && description && imgUrl && imdbUrl && imdbId).length) {
      this.props.addMovie(
        {
          title, description, imgUrl, imdbUrl, imdbId,
        },
      );
      this.setState(
        {
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        },
      );
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <Form
        onSubmit={event => event.preventDefault()}
        className="form"
      >
        <FormControl
          name={title}
          placeHolder="title"
          onChange={this.changeInputValue}
        />
        <FormControl
          row={4}
          as="textarea"
          name={description}
          onChange={this.changeInputValue}
          placeHolder="description"
        />
        <FormControl
          placeHolder="imgUrl"
          onChange={this.changeInputValue}
          name={imgUrl}
        />
        <FormControl
          placeHolder="imdbUrl"
          onChange={this.changeInputValue}
          name={imdbUrl}
        />
        <FormControl
          placeHolder="imdbId"
          onChange={this.changeInputValue}
          name={imdbId}
        />
        <Button
          onClick={this.addAll}
          type="submit"
          disabled={
            (title && description && imgUrl && imdbUrl && imdbId).length === 0
              && true
          }
        >
          Submit
        </Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
