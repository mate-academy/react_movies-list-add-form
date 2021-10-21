import { Component } from 'react';

type Props = {
  addMovie : (newMovie: Movie) => void
};

interface State {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  submit = () => {
    const {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    if (title !== '' && imdbId !== '' && imdbUrl !== '' && imgUrl !== '') {
      this.props.addMovie(this.state);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={(e) => {
          this.submit();
          e.preventDefault();
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="form__input-title">
          Title
          <br />
          <input
            type="text"
            id="form__input-title"
            value={title}
            required
            onChange={(e) => this.setState({ title: e.currentTarget.value })}
          />
        </label>
        <br />

        <label htmlFor="form__input-description">
          Description
          <br />
          <input
            type="text"
            id="form__input-description"
            value={description}
            onChange={(e) => this.setState({ description: e.currentTarget.value })}
          />
        </label>
        <br />

        <label htmlFor="form__input-imgurl">
          imgUrl
          <br />
          <input
            type="text"
            id="form__input-imgurl"
            value={imgUrl}
            onChange={(e) => this.setState({ imgUrl: e.currentTarget.value })}
          />
        </label>
        <br />

        <label htmlFor="form__input-imdburl">
          imdbUrl
          <br />
          <input
            type="text"
            id="form__input-imdburl"
            value={imdbUrl}
            onChange={(e) => this.setState({ imdbUrl: e.currentTarget.value })}
          />
        </label>
        <br />

        <label htmlFor="form__input-imdbId">
          imdbId
          <br />
          <input
            type="text"
            id="form__input-imdbId"
            value={imdbId}
            onChange={(e) => this.setState({ imdbId: e.currentTarget.value })}
          />
        </label>
        <br />
        <button
          className="form__submit"
          type="submit"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}
