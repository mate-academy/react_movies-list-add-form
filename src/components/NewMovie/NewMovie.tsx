import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
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

  onSubmited = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.title
      || !this.state.description
      || !this.state.imgUrl
      || !this.state.imdbUrl
      || !this.state.imdbId) {
      return;
    }

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmited} className='form__field'>
        <p className='text__head'>Create new movie</p>
        <label htmlFor="text__field">
          <input
            className='label__field'
            id='text__field'
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
        </label>
        <div>
          <textarea
            className='textarea__field'
            name="Description"
            cols={23}
            rows={2}
            placeholder="Description"
            value={this.state.description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
        </div>
        <label htmlFor="imgUrl__field">
          <input
            className='label__field'
            id='imgUrl__field'
            type="text"
            placeholder="imgUrl"
            value={this.state.imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="imdbUrl__field">
          <input
            className='label__field'
            id='imdbUrl__field'
            type="text"
            placeholder="imdbUrl"
            value={this.state.imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
        </label>
        <label htmlFor="imdbId__field">
          <input
            className='label__field'
            id='imdbId__field'
            type="text"
            placeholder="imdbld"
            value={this.state.imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
          />
        </label>
        <button type="submit" className='button'>
          Add movie
        </button>
      </form>
    );
  }
}
