import React, { Component } from 'react';
import classNames from 'classnames';
import { InputElement } from '../InputElement';

import './NewMovie.scss';

type Props = {
  add(movie: Movie): void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isValid: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValid: true,
  };

  validation = () => {
    const {
      title, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return !!title.trim() && !!imgUrl.trim() && !!imdbUrl.trim() && !!imdbId.trim();
  };

  handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAddDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleAddImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
    });
  };

  handleAddImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
    });
  };

  handleAddImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
    });
  };

  onAdd = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.validation()) {
      this.setState({
        isValid: false,
      });

      return;
    }

    this.props.add(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isValid: true,
    });
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId, isValid,
    } = this.state;

    return (
      <form className="form" onSubmit={this.onAdd}>
        <span className={classNames(
          'form__error',
          { 'form__error--active': !isValid },
        )}
        >
          Required fields must be filled
        </span>

        <InputElement
          label="Enter title of the film:"
          title={title}
          type="title"
          onChange={this.handleAddTitle}
          required
        />

        <InputElement
          label="Enter description of the film:"
          title={description}
          type="description"
          onChange={this.handleAddDescription}
          required={false}
        />

        <InputElement
          label="Enter url image of the film:"
          title={imgUrl}
          type="imgUrl"
          onChange={this.handleAddImgUrl}
          required
        />

        <InputElement
          label="Enter imdbUrl"
          title={imdbUrl}
          type="imdbUrl"
          onChange={this.handleAddImdbUrl}
          required
        />

        <InputElement
          label="Enter imdbId:"
          title={imdbId}
          type="imdbId"
          onChange={this.handleAddImdbId}
          required
        />

        <button
          type="submit"
          className="form__button"
        >
          Add film
        </button>
      </form>
    );
  }
}
