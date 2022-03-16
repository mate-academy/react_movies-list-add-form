import { Component } from 'react';

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
    imdbId: '0',
  };

  render() {
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          onAdd(this.state);
        }}
      >
        <input
          type="text"
          placeholder="Enter a title"
          value={this.state.title}
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
          placeholder="Enter a description"
          value={this.state.description}
          onChange={event => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="Enter a image adress"
          value={this.state.imgUrl}
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
          onChange={event => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button
          type="submit"
        >
          CREATE
        </button>
      </form>
    );
  }
}
