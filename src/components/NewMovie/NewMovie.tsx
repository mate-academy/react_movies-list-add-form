import { Component } from 'react';

type Props = {
  addNewFilm: (movie: Movie) => void;
};

type State = {
  newtitle: string,
  newdescription: string,
  newimgUrl: string,
  newimdbUrl: string,
  newimdbId: string,
  isnewtitle: boolean,
  isnewdescription: boolean,
  isnewimgUrl: boolean,
  isnewimdbUrl: boolean,
  isnewimdbId: boolean,
  isbutton: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newtitle: '',
    newdescription: '',
    newimgUrl: '',
    newimdbUrl: '',
    newimdbId: '',
    isnewtitle: false,
    isnewdescription: false,
    isnewimgUrl: false,
    isnewimdbUrl: false,
    isnewimdbId: false,
    isbutton: true,
  };

  // eslint-disable-next-line max-len
  re = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  isButton = () => {
    if (this.state.newtitle
    && this.state.newdescription
    && this.state.newimdbId
    && this.state.newimdbUrl
    && this.state.newimgUrl
    ) {
      this.setState({ isbutton: false });
    }
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!this.state.newtitle) {
      this.setState({ isnewtitle: true });
    }

    if (!this.state.newdescription) {
      this.setState({ isnewdescription: true });
    }

    if (!this.re.test(this.state.newimdbUrl)) {
      this.setState({ isnewimdbUrl: true });

      return;
    }

    if (this.re.test(this.state.newimdbUrl)) {
      this.setState({ isnewimdbUrl: false });
    }

    if (!this.re.test(this.state.newimgUrl)) {
      this.setState({ isnewimgUrl: true });

      return;
    }

    if (this.re.test(this.state.newimgUrl)) {
      this.setState({ isnewimgUrl: false });
    }

    if (!this.state.newimdbId) {
      this.setState({ isnewimdbId: true });
    }

    if (this.state.newtitle
      && this.state.newdescription
      && this.state.newimdbId
      && this.state.newimdbUrl
      && this.state.newimgUrl
    ) {
      const newFilm: Movie = {
        title: this.state.newtitle,
        description: this.state.newdescription,
        imgUrl: this.state.newimgUrl,
        imdbUrl: this.state.newimdbUrl,
        imdbId: this.state.newimdbId,
      };

      this.props.addNewFilm(newFilm);
    }

    this.setState({ newtitle: '' });
    this.setState({ newdescription: '' });
    this.setState({ newimdbId: '' });
    this.setState({ newimdbUrl: '' });
    this.setState({ newimgUrl: '' });
    this.setState({ isbutton: true });
  };

  // isCorrectUrlIMGHandler = (
  //   event: { target: { value: string, name: string }; },
  // ) => {
  //   const { value, name } = event.target;

  //   if (name === 'newimgUrl') {
  //     this.setState(() => {
  //       // eslint-disable-next-line no-console
  //       console.log((this.re).test(value));

  //       if ((this.re).test(value)) {
  //         this.setState({ newimgUrl: value });
  //       } else {
  //         this.setState({ isnewimgUrl: true });
  //       }
  //     });
  //     this.setState({ isnewimgUrl: false });
  //   }

  //   if (name === 'newimdbUrl') {
  //     this.setState(() => {
  //       if ((this.re).test(value)) {
  //         this.setState({ newimdbUrl: value });
  //       } else {
  //         this.setState({ isnewimdbUrl: true });
  //       }
  //     });
  //     this.setState({ isnewimdbUrl: false });
  //   }
  // };

  render() {
    return (
      <div className="">
        <form
          onChange={this.isButton}
          onSubmit={this.handleSubmitForm}
        >
          <div className="notification">Put the data below</div>
          <div className="">
            <input
              className="control mb-3"
              type="text"
              placeholder="title"
              value={this.state.newtitle}
              onChange={(event) => {
                this.setState({ newtitle: event.target.value });
                this.setState({ isnewtitle: false });
              }}
            />
            {this.state.isnewtitle && (
              <div className="notification is-danger">Title is empty</div>
            )}
          </div>
          <div className="">
            <input
              className="control mb-3"
              type="text"
              placeholder="description"
              value={this.state.newdescription}
              onChange={(event) => {
                this.setState({ newdescription: event.target.value });
                this.setState({ isnewdescription: false });
              }}
            />
            {this.state.isnewdescription && (
              <div className="notification is-danger">Description is empty</div>
            )}
          </div>
          <div className="">
            <input
              name="newimgUrl"
              className="control mb-3"
              type="text"
              placeholder="imgUrl"
              value={this.state.newimgUrl}
              onChange={(event) => {
                this.setState({ newimgUrl: event.target.value });
              }}
            />
            {this.state.isnewimgUrl && (
              <div className="
              notification is-danger mb-3"
              >
                Paste correct URL

              </div>
            )}
          </div>
          <div className="">
            <input
              name="newimdbUrl"
              className="control mb-3"
              type="text"
              placeholder="imdbUrl"
              value={this.state.newimdbUrl}
              onChange={(event) => {
                this.setState({ newimdbUrl: event.target.value });
              }}
            />
            {this.state.isnewimdbUrl && (
              <div className="
              notification is-danger mb-3"
              >
                Paste correct URL

              </div>
            )}
          </div>
          <div className="">
            <input
              className="control mb-3"
              type="text"
              placeholder="imdbId"
              required
              value={this.state.newimdbId}
              onChange={(event) => {
                this.setState({ newimdbId: event.target.value });
                this.setState({ isnewimdbId: false });
              }}
            />
            {this.state.isnewimdbId && (
              <div className="notification is-danger">New imdbId is empty</div>
            )}
          </div>
          <button
            className="button is-primary mt-3"
            type="submit"
            disabled={this.state.isbutton}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
