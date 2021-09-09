import React from 'react';

type Props = {
  onAdd: (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,) => void;
};
type State = {
  errorMessage: string;
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
} | { [x: string]: string; };

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handlerForm = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { onAdd } = this.props;

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errorMessage,
    } = this.state;

    return (
      <>
        <h2 className="display-6 text-decoration-underline">Add Movie here</h2>
        <div className="error">{errorMessage && 'Enter correct url'}</div>
        <form onSubmit={(event) => {
          event.preventDefault();
          if (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imgUrl) === false) {
            this.setState({
              errorMessage: 'imgUrl',
            });

            return;
          }

          if (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbUrl) === false) {
            this.setState({
              errorMessage: 'imdbUrl',
            });

            return;
          }

          onAdd(
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          );
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
        >
          <div className="col-auto">
            <label className="form-label" htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                className="form-control form-control-lg"
                value={title}
                onChange={this.handlerForm}
                required
              />
            </label>
          </div>
          <div className="col-auto">
            <label className="form-label" htmlFor="description">
              Desription
              <textarea
                className="form-control form-control-lg"
                name="description"
                value={description}
                onChange={this.handlerForm}
              />
            </label>
          </div>
          <div className="col-auto">
            <label className="form-label" htmlFor="title">
              imgUrl
              <input
                type="text"
                className="form-control form-control-lg"
                name="imgUrl"
                value={imgUrl}
                onChange={this.handlerForm}
                required
              />
            </label>
            {errorMessage === 'imgUrl' && (<div className="error">Enter a valid imgUrl URL</div>)}
          </div>
          <div className="col-auto">
            <label className="form-label" htmlFor="title">
              imdbUrl
              <input
                type="text"
                className="form-control form-control-lg"
                name="imdbUrl"
                value={imdbUrl}
                onChange={this.handlerForm}
                required
              />
            </label>
            {errorMessage === 'imdbUrl' && (<div className="error">Enter a valid imdbUrl URL</div>)}
          </div>
          <div className="col-auto">
            <label className="form-label" htmlFor="title">
              imdbId
              <input
                type="text"
                className="form-control form-control-lg"
                name="imdbId"
                value={imdbId}
                onChange={this.handlerForm}
                required
              />
            </label>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Confirm</button>
          </div>
        </form>
      </>
    );
  }
}
