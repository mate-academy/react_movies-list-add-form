import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAddMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleCheck: boolean,
  imgUrlCheck: boolean,
  imdbUrlCheck: boolean,
  imdbIdCheck: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleCheck: false,
    imgUrlCheck: false,
    imdbUrlCheck: false,
    imdbIdCheck: false,
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleCheck: false,
      imgUrlCheck: false,
      imdbUrlCheck: false,
      imdbIdCheck: false,
    });
  };

  handleChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const movesObj = { ...this.state };

    this.props.onAddMovie(movesObj);
    this.resetForm();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          className="form-input"
          required
          name="title"
          placeholder="Title"
          onInvalid={() => (
            this.setState(state => ({
              titleCheck: !state.titleCheck,
            }))
          )}
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        {this.state.titleCheck
        && <div className="error-message">Please enter a title</div>}
        <textarea
          className="form-input"
          name="Description"
          placeholder="description"
          cols={10}
          rows={5}
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          className="form-input"
          required
          type="text"
          name="mgUrl"
          placeholder="ImgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          onInvalid={() => (
            this.setState(state => ({
              imgUrlCheck: !state.imgUrlCheck,
            }))
          )}
        />
        {this.state.imgUrlCheck
        && <div className="error-message">Invaid imgUrl</div>}
        <input
          className="form-input"
          required
          type="text"
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          onInvalid={() => (
            this.setState(state => ({
              imdbUrlCheck: !state.imdbUrlCheck,
            }))
          )}
        />
        {this.state.imdbUrlCheck
        && <div className="error-message">Invalid imdbUrl</div>}
        <input
          className="form-input"
          required
          type="text"
          name="imdbId"
          placeholder="ImdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          onInvalid={() => (
            this.setState(state => ({
              imdbIdCheck: !state.imdbIdCheck,
            }))
          )}
        />
        {this.state.imdbIdCheck
        && <div className="error-message">Invalid imdbId</div>}
        <button type="submit" className="button">
          Add film
        </button>
      </form>
    );
  }
}
