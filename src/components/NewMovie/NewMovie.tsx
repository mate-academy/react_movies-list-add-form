/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';

type Props = {
  onAdd: (state: State) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as Pick<State, keyof State>));
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="movieForm">
          <label htmlFor="title">
            *Title:
          </label>
          <input
            name="title"
            type="text"
            id="title"
            placeholder="Enter a title..."
            value={title}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="movieForm">
          <label htmlFor="description">
            Description:
          </label>
          <input
            name="description"
            type="text"
            id="description"
            placeholder="Enter a description..."
            value={description}
            onChange={this.handleChange}
          />
        </div>
        <div className="movieForm">
          <label htmlFor="imgUrl">
            *Image Url:
          </label>
          <input
            name="imgUrl"
            type="text"
            id="imgUrl"
            placeholder="Enter an image url..."
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="movieForm">
          <label htmlFor="imdbUrl">
            *IMDb Url:
          </label>
          <input
            name="imdbUrl"
            type="text"
            id="imdbUrl"
            placeholder="Enter an IMDb url..."
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="movieForm">
          <label htmlFor="imdbId">
            *IMDb Id:
          </label>
          <input
            name="imdbId"
            type="text"
            id="imdbId"
            placeholder="Enter an IMDb id..."
            value={imdbId}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="movieForm">
          <p>* - required fields.</p>
          <button type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}
