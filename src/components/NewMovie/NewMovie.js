import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './NewMovie.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValidatedImgUrl: false,
    isValidatedImdbUrl: false,
  };

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  blurHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl') {
      // eslint-disable-next-line max-len
      if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value)) {
        this.setState({ isValidatedImgUrl: true });

        return;
      }

      this.setState({ isValidatedImgUrl: false });
    }

    if (name === 'imdbUrl') {
      // eslint-disable-next-line max-len
      if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value)) {
        this.setState({ isValidatedImdbUrl: true });

        return;
      }

      this.setState({ isValidatedImdbUrl: false });
    }

    this.setState({
      [name]: value,
    });
  }

  buttonClicker = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValidatedImgUrl,
      isValidatedImdbUrl,
    } = this.state;
    const test = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
    const { onAdd } = this.props;

    if (!isValidatedImdbUrl && !isValidatedImgUrl) {
      onAdd(test);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        isValidatedImgUrl: false,
        isValidatedImdbUrl: false,
      });
    }
  }

  render() {
    const {
      title,
      description,
      isValidatedImgUrl,
      isValidatedImdbUrl,
      imdbId,
    } = this.state;

    return (
      <Form
        method="POST"
        onSubmit={this.buttonClicker}
      >
        <div className="inputField mt-2">
          <label
            htmlFor="title"
          >
            Input title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.changeHandler}
            required
          />
        </div>
        <div className="inputField mt-2">
          <label
            htmlFor="description"
          >
            Input description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.changeHandler}
          />
        </div>
        <div className="inputField mt-2">
          <label
            htmlFor="imgUrl"
          >
            Input imgUrl
          </label>
          <input
            className={
              classnames({ validation: isValidatedImgUrl })}
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={this.state.imgUrl}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            required
          />
        </div>
        <div className="alert">
          <Alert
            hidden={!isValidatedImgUrl}
            className={classnames('alert__inner')}
            variant="danger"
          >
            Input correct URL
          </Alert>
        </div>
        <div className="inputField mt-2">
          <label
            htmlFor="imdbUrl"
          >
            Input imdbUrl
          </label>
          <input
            className={
              classnames({ validation: isValidatedImdbUrl })}
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.changeHandler}
            onBlur={this.blurHandler}
            required
          />
        </div>
        <div className="alert">
          <Alert
            hidden={!isValidatedImdbUrl}
            className={classnames('alert__inner')}
            variant="danger"
          >
            Input correct URL
          </Alert>
        </div>
        <div className="inputField mt-2">
          <label
            htmlFor="imdbId"
          >
            Input imdbId
          </label>
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.changeHandler}
            required
          />
        </div>
        <div>
          <Button
            className="mt-5"
            type="submit"
            disabled={isValidatedImdbUrl || isValidatedImgUrl}
          >
            Add movie
          </Button>
        </div>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
