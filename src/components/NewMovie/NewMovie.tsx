import classNames from 'classnames';
import React from 'react';

type Props = {
  onAdd: any,
};
type State = {
  newTitle?: string,
  newDescription?: string,
  newImgUrl?: string,
  newImbdUrl?: string,
  newImbdId?: string,
  newTitleValid?: boolean,
  newImgUrlValid?: boolean,
  newImbdUrlValid?: boolean,
  newImbdIdValid?: boolean,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    newTitle: '',
    newDescription: '',
    newImgUrl: '',
    newImbdUrl: '',
    newImbdId: '',
    newTitleValid: true,
    newImgUrlValid: true,
    newImbdUrlValid: true,
    newImbdIdValid: true,
  };

  changeInput = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      newTitle, newDescription, newImbdId, newImbdUrl, newImgUrl, newTitleValid,
      newImgUrlValid, newImbdUrlValid, newImbdIdValid,
    } = this.state;
    const invalidSubmit = !newImbdIdValid || !newTitleValid || !newImgUrlValid || !newImbdUrlValid;

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="form"
      >
        <label htmlFor="new-title">
          <p>
            Enter title of movie
          </p>
          <input
            name="newTitle"
            formNoValidate
            type="text"
            id="new-title"
            value={newTitle}
            className={classNames('new-title', { 'error-input': !newTitleValid })}
            placeholder="Title of movie"
            onChange={this.changeInput}
            onBlur={(e) => {
              const checkText = !e.target.value.trim() || !e.target.value.match(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/);

              if (checkText) {
                this.setState({
                  newTitleValid: false,
                });
              } else {
                this.setState({
                  newTitleValid: true,
                });
              }
            }}
          />
        </label>
        <div
          className={classNames('error', { 'error-visible': !newTitleValid })}
        >
          Enter correct info
        </div>
        <label htmlFor="new-description" className="new-description">
          <p>
            Enter description of movie
          </p>
          <input
            name="newDescription"
            formNoValidate
            type="text"
            id="new-description"
            value={newDescription}
            onChange={this.changeInput}
            placeholder="Description of movie"
          />
        </label>
        <label htmlFor="new-img-url">
          <p>
            Enter imgUrl of movie
          </p>
          <input
            name="newImgUrl"
            formNoValidate
            type="text"
            id="new-img-url"
            value={newImgUrl}
            className={classNames('new-img-url', { 'error-input': !newImgUrlValid })}
            placeholder="imgUrl"
            onChange={this.changeInput}
            onBlur={(e) => {
              const checkUrl = !e.target.value.trim()
                || !e.target.value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

              if (checkUrl) {
                this.setState({
                  newImgUrlValid: false,
                });
              } else {
                this.setState({
                  newImgUrlValid: true,
                });
              }
            }}
          />
        </label>
        <div
          className={classNames('error', { 'error-visible': !newImgUrlValid })}
        >
          Enter correct info
        </div>
        <label htmlFor="new-imbd-url">
          <p>
            Enter imdbUrl of movie
          </p>
          <input
            name="newImbdUrl"
            formNoValidate
            type="text"
            id="new-imbd-url"
            value={newImbdUrl}
            className={classNames('new-imbd-url', { 'error-input': !newImbdUrlValid })}
            placeholder="imdbUrl"
            onChange={this.changeInput}
            onBlur={(e) => {
              const checkUrl = !e.target.value.trim()
                || !e.target.value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

              if (checkUrl) {
                this.setState({
                  newImbdUrlValid: false,
                });
              } else {
                this.setState({
                  newImbdUrlValid: true,
                });
              }
            }}
          />
        </label>
        <div
          className={classNames('error', { 'error-visible': !newImbdUrlValid })}
        >
          Enter correct info
        </div>
        <label htmlFor="new-imbd-id">
          <p>
            Enter imdbId of movie
          </p>
          <input
            name="newImbdId"
            formNoValidate
            type="text"
            id="new-imbd-id"
            value={newImbdId}
            className={classNames('new-imbd-id', { 'error-input': !newImbdIdValid })}
            placeholder="imdbId"
            onChange={this.changeInput}
            onBlur={(e) => {
              const checkText = !e.target.value || !e.target.value.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);

              if (checkText) {
                this.setState({
                  newImbdIdValid: false,
                });
              } else {
                this.setState({
                  newImbdIdValid: true,
                });
              }
            }}
          />
        </label>
        <div
          className={classNames('error', { 'error-visible': !newImbdIdValid })}
        >
          Enter correct info
        </div>
        <button
          className="add-button"
          disabled={invalidSubmit}
          type="submit"
          onClick={() => {
            const movie = {
              title: newTitle,
              description: newDescription,
              imgUrl: newImgUrl,
              imdbUrl: newImbdUrl,
              imdbId: newImbdId,
            };

            this.props.onAdd(movie);

            this.setState({
              newTitle: '',
              newDescription: '',
              newImgUrl: '',
              newImbdUrl: '',
              newImbdId: '',
            });
          }}
        >
          Add movie
        </button>
      </form>
    );
  }
}
