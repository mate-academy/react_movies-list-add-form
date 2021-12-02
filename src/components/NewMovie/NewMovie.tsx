import { Component, FocusEvent } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  newTitle: string,
  newDescription: '',
  newImgUrl: string,
  newImdbUrl: string,
  newImdbId: string,
  formErrors: {
    isTitleValid: boolean,
    isImgUrlValid: boolean,
    isImdbUrlValid: boolean,
    isImdbIdValid: boolean,
  }
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newTitle: '',
    newDescription: '',
    newImgUrl: '',
    newImdbUrl: '',
    newImdbId: '',
    formErrors: {
      isTitleValid: true,
      isImgUrlValid: true,
      isImdbUrlValid: true,
      isImdbIdValid: true,
    },
  };

  regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  handleChange = (event: { target: { name: string, value: string } }) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
      formErrors: {
        ...state.formErrors,
        isTitleValid: true,
        isImgUrlValid: true,
        isImdbUrlValid: true,
        isImdbIdValid: true,
      },
    }));
  };

  checkForErrors = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.name === 'newTitle' && !event.target.value) {
      this.setState(state => ({
        ...state,
        formErrors: {
          ...state.formErrors,
          isTitleValid: false,
        },
      }));
    }

    if (event.target.name === 'newImgUrl' && !event.target.value.match(this.regExp)) {
      this.setState(state => ({
        ...state,
        formErrors: {
          ...state.formErrors,
          isImgUrlValid: false,
        },
      }));
    }

    if (event.target.name === 'newImdbUrl' && !event.target.value.match(this.regExp)) {
      this.setState(state => ({
        ...state,
        formErrors: {
          ...state.formErrors,
          isImdbUrlValid: false,
        },
      }));
    }

    if (event.target.name === 'newImdbId' && !event.target.value) {
      this.setState(state => ({
        ...state,
        formErrors: {
          ...state.formErrors,
          isImdbIdValid: false,
        },
      }));
    }
  };

  handleClick = () => {
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    } = this.state;

    const movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    this.props.onAdd(movie);

    this.setState({
      newTitle: '',
      newDescription: '',
      newImgUrl: '',
      newImdbUrl: '',
      newImdbId: '',
    });
  };

  render() {
    const {
      newTitle,
      newDescription,
      newImgUrl,
      newImdbUrl,
      newImdbId,
    } = this.state;

    const {
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state.formErrors;

    const isAllDataValid = newTitle
      && newImgUrl.match(this.regExp)
      && newImdbUrl.match(this.regExp)
      && newImdbId;

    return (
      <form
        className="Add_Movie"
        onSubmit={(event) => event.preventDefault()}
      >
        <p>Title</p>
        <input
          type="text"
          name="newTitle"
          value={newTitle}
          autoComplete="off"
          placeholder="Enter Movie Title"
          className={isTitleValid ? 'Add_Movie__card' : 'Add_Movie__card--error'}
          onChange={this.handleChange}
          onBlur={this.checkForErrors}
        />
        <div
          className="Error_Container"
        >
          <p
            className="Error_Container--message"
            hidden={isTitleValid}
          >
            Enter Correct Info
          </p>
        </div>
        <p>Description</p>
        <textarea
          rows={3}
          name="newDescription"
          value={newDescription}
          autoComplete="off"
          placeholder="Enter Movie Description"
          className="Add_Movie__card card-description"
          onChange={this.handleChange}
        />
        <p>Image</p>
        <input
          type="text"
          name="newImgUrl"
          value={newImgUrl}
          autoComplete="off"
          placeholder="Enter Image URL"
          className={isImgUrlValid ? 'Add_Movie__card' : 'Add_Movie__card--error'}
          onChange={this.handleChange}
          onBlur={this.checkForErrors}
        />
        <div
          className="Error_Container"
        >
          <p
            className="Error_Container--message"
            hidden={isImgUrlValid}
          >
            Enter Correct Info
          </p>
        </div>
        <p>IMDB URL</p>
        <input
          type="text"
          name="newImdbUrl"
          value={newImdbUrl}
          autoComplete="off"
          placeholder="Enter IMDB URL"
          className={isImdbUrlValid ? 'Add_Movie__card' : 'Add_Movie__card--error'}
          onChange={this.handleChange}
          onBlur={this.checkForErrors}
        />
        <div
          className="Error_Container"
        >
          <p
            className="Error_Container--message"
            hidden={isImdbUrlValid}
          >
            Enter Correct Info
          </p>
        </div>
        <p>IMDB ID</p>
        <input
          type="text"
          name="newImdbId"
          value={newImdbId}
          autoComplete="off"
          placeholder="Enter IMDB ID"
          className={isImdbIdValid ? 'Add_Movie__card' : 'Add_Movie__card--error'}
          onChange={this.handleChange}
          onBlur={this.checkForErrors}
        />
        <div
          className="Error_Container"
        >
          <p
            className="Error_Container--message"
            hidden={isImdbIdValid}
          >
            Enter Correct Info
          </p>
        </div>
        <button
          type="button"
          disabled={!isAllDataValid}
          onClick={this.handleClick}
        >
          Add New Movie
        </button>
      </form>
    );
  }
}
