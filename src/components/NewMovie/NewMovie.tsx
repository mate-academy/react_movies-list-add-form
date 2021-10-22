import classNames from 'classnames';
import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  invalidTitle: boolean;
  invalidImgUrl: boolean;
  invalidImdbUrl: boolean;
  invalidImdbId: boolean;
};

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    invalidTitle: false,
    invalidImgUrl: false,
    invalidImdbUrl: false,
    invalidImdbId: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  checkTitle = (value: string) => {
    this.setState({ invalidTitle: !value });
  };

  checkImg = (value: string) => {
    this.setState({ invalidImgUrl: !value || !regex.test(value) });
  };

  checkUrl = (value: string) => {
    this.setState({ invalidImdbUrl: !value || !regex.test(value) });
  };

  checkId = (value: string) => {
    this.setState({ invalidImdbId: !value });
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
      invalidImdbId,
      invalidImdbUrl,
      invalidImgUrl,
      invalidTitle,
    } = this.state;

    const { onAdd } = this.props;

    return (
      <form
        className="NewMovie"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state);
          this.clearState();
        }}
      >

        <input
          className={classNames(
            'NewMovie__input',
            { 'NewMovie__input--error': invalidTitle },
          )}
          type="text"
          value={title}
          placeholder="enter title"
          required
          onChange={event => {
            this.setState({
              title: event.target.value,
              invalidTitle: false,
            });
          }}
          onBlur={event => {
            this.checkTitle(event.target.value);
          }}
        />

        <p className="NewMovie__error">
          {invalidTitle && 'please enter title'}
        </p>

        <input
          className="NewMovie__input"
          type="text"
          value={description}
          placeholder="enter description"
          onChange={event => {
            this.setState({ description: event.target.value });
          }}
        />

        <input
          className={classNames(
            'NewMovie__input',
            { 'NewMovie__input--error': invalidImgUrl },
          )}
          type="text"
          value={imgUrl}
          placeholder="add image url"
          required
          onChange={event => {
            this.setState({
              imgUrl: event.target.value,
              invalidImgUrl: false,
            });
          }}
          onBlur={event => {
            this.checkImg(event.target.value);
          }}
        />

        <p className="NewMovie__error">
          {invalidImgUrl && 'please enter valid image url'}
        </p>

        <input
          className={classNames(
            'NewMovie__input',
            { 'NewMovie__input--error': invalidImdbUrl },
          )}
          type="text"
          value={imdbUrl}
          placeholder="enter imdb url"
          required
          onChange={event => {
            this.setState({
              imdbUrl: event.target.value,
              invalidImdbUrl: false,
            });
          }}
          onBlur={event => {
            this.checkUrl(event.target.value);
          }}
        />

        <p className="NewMovie__error">
          {invalidImdbUrl && 'please enter valid imdb url'}
        </p>

        <input
          className={classNames(
            'NewMovie__input',
            { 'NewMovie__input--error': invalidImdbId },
          )}
          type="text"
          value={imdbId}
          placeholder="enter imdb id"
          required
          onChange={event => {
            this.setState({
              imdbId: event.target.value,
              invalidImdbId: false,
            });
          }}
          onBlur={event => {
            this.checkId(event.target.value);
          }}
        />

        <p className="NewMovie__error">
          {invalidImdbId && 'please enter valid ID'}
        </p>

        <button
          className="NewMovie__button"
          type="submit"
          disabled={invalidImdbId
            || invalidImdbUrl
            || invalidImgUrl
            || invalidTitle}
        >
          add movie
        </button>
      </form>
    );
  }
}
