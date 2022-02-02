import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // eslint-disable-next-line no-console
    console.log(event);

    this.setState({ title: value });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state });
    this.setState({
      title: '12',
      description: '2',
      imgUrl: '3',
      imdbUrl: '4',
      imdbId: '5',
    });
  };

  render() {
    const {
      title,
    } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <form
          onSubmit={() => this.handleSubmit}
        >
          <input
            name="title"
            type="text"
            placeholder="Please input title"
            value={title}
            onChange={(event) => this.handlerChange(event)}
          />
          {/* <input
            name={description}
            type="text"
            placeholder="Please input description"
            value={description}
            onChange={this.handlerChange}
          />
          <input
            name={imgUrl}
            type="text"
            placeholder="input smth"
            value={imgUrl}
            onChange={this.handlerChange}
          />
          <input
            name={imdbUrl}
            type="text"
            placeholder="input smth"
            value={imdbUrl}
            onChange={this.handlerChange}
          />
          <input
            name={imdbId}
            type="text"
            placeholder="input smth"
            value={imdbId}
            onChange={this.handlerChange}
          /> */}
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
