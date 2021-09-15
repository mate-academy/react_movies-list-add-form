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

  clearForm = () => {
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
    this.clearForm();
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

  handleChange = (event: Event) => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
      } as Pick<State, keyof State>,
    );
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
          onChange={this.handleChange}
        />
        <textarea
          className="NewMovie__element NewMovie__element--textarea"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="Image URL *"
          name="imgUrl"
          required
          value={this.state.imgUrl}
          type="text"
          onChange={this.handleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="IMDb URL *"
          name="imdbUrl"
          required
          value={this.state.imdbUrl}
          type="text"
          onChange={this.handleChange}
        />
        <input
          className="NewMovie__element"
          placeholder="IMDb id *"
          name="imdbId"
          required
          value={this.state.imdbId}
          type="text"
          onChange={this.handleChange}
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
