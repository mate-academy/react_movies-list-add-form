import { Component } from 'react';
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

  render() {
    const { onAdd } = this.props;

    return (
      <form
        className="box"
        onSubmit={(event) => {
          event.preventDefault();

          onAdd(this.state);
        }}
      >

        <input
          type="text"
          placeholder="Enter a title"
          value={this.state.title}
          className="input"
          onChange={
            event => {
              this.setState({
                title: event.target.value,
              });
            }
          }
        />
        <input
          type="text"
          placeholder="Enter a film description"
          value={this.state.description}
          className="input"
          onChange={event => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="Enter a image URL"
          value={this.state.imgUrl}
          className="input"
          onChange={event => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="Enter a imdb link"
          value={this.state.imdbUrl}
          className="input"
          onChange={event => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="Enter a imdb id"
          value={this.state.imdbId}
          className="input"
          onChange={event => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button
          type="submit"
          className="button is-primary"
        >
          CREATE
        </button>
      </form>
    );
  }
}
