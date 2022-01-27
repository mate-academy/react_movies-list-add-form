/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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

  addValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
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

  render() {
    const { onAdd } = this.props;

    return (
      <div>
        <h1>New Movie</h1>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            onAdd(this.state);
            this.clearForm();
          }}
        >
          <div className="form_item">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" onChange={this.addValue} required />
          </div>
          <div className="form_item">
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" onChange={this.addValue} />
          </div>
          <div className="form_item">
            <label htmlFor="imgUrl">imgUrl:</label>
            <input type="text" id="imgUrl" name="imgUrl" onChange={this.addValue} required />
          </div>
          <div className="form_item">
            <label htmlFor="imdbUrl">imdbUrl:</label>
            <input type="text" id="imdbUrl" name="imdbUrl" onChange={this.addValue} required />
          </div>
          <div className="form_item">
            <label htmlFor="imdbId">imdbId:</label>
            <input type="text" id="imdbId" name="imdbId" onChange={this.addValue} required />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
