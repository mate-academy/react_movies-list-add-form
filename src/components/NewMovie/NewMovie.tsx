import classNames from 'classnames';
import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  getDefaultState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.getDefaultState();
  };

  titleHandleChange = (event: Event) => {
    this.setState({ title: event.target.value });
  };

  descriptionHandleChange = (event: Event) => {
    this.setState({ description: event.target.value });
  };

  imgUrlHandleChange = (event: Event) => {
    this.setState({ imgUrl: event.target.value });
  };

  imdbUrlHandleChange = (event: Event) => {
    this.setState({ imdbUrl: event.target.value });
  };

  imdbIdHandleChange = (event: Event) => {
    this.setState({ imdbId: event.target.value });
  };

  getDisableButton = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return !title || !imgUrl || !imdbId || !imdbUrl;
  };

  render() {
    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        <input
          className="NewMovie__element"
          placeholder="Title *"
          name="title"
          type="text"
          required
          value={this.state.title}
          onChange={this.titleHandleChange}
        />
        <textarea
          className="NewMovie__element NewMovie__element--textarea"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.descriptionHandleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="Image URL *"
          name="imgUrl"
          required
          value={this.state.imgUrl}
          type="text"
          onChange={this.imgUrlHandleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="IMDb URL *"
          name="imdbUrl"
          required
          value={this.state.imdbUrl}
          type="text"
          onChange={this.imdbUrlHandleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="IMDb id *"
          name="imdbId"
          required
          value={this.state.imdbId}
          type="text"
          onChange={this.imdbIdHandleChange}
        />
        <button
          className={classNames(
            'NewMovie__element NewMovie__element--button',
            {
              'NewMovie__element--button--disabled': this.getDisableButton(),
            },
          )}
          type="submit"
          disabled={this.getDisableButton()}
        >
          ADd MOVIe
        </button>
      </form>
    );
  }
}
