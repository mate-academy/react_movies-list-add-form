import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export class NewMovie extends PureComponent {
  state = {
    inputTitle: '',
    inputDescription: '',
    inputImgUrl: '',
    inputImdbUrl: '',
  };

  clearState = () => {
    this.setState({
      inputTitle: '',
      inputDescription: '',
      inputImgUrl: '',
      inputImdbUrl: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      inputTitle,
      inputDescription,
      inputImgUrl,
      inputImdbUrl,
    } = this.state;
    const newMovie = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImgUrl,
      imdbUrl: inputImdbUrl,
      imdbId: uuidv4(),
    };

    this.props.onAdd(newMovie);
    this.clearState();
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const
      {
        inputTitle,
        inputDescription,
        inputImdbUrl,
        inputImgUrl,
      } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="form-group row">
          <label
            htmlFor="inputTitle"
            className="col-sm-5 col-form-label"
          >
            title:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="inputTitle"
              onChange={this.handleChange}
              value={inputTitle}
              className="form-control"
              id="inputTitle"
              placeholder="input title here"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputDescription" className="col-sm-5 col-form-label">
            description:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="inputDescription"
              onChange={this.handleChange}
              value={inputDescription}
              className="form-control"
              id="inputDescription"
              placeholder="input description here"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputImgUrl" className="col-sm-5 col-form-label">
            ImgUrl:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="inputImgUrl"
              onChange={this.handleChange}
              value={inputImgUrl}
              className="form-control"
              id="inputImgUrl"
              placeholder="input ImgUrl here"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputImdbUrl" className="col-sm-5 col-form-label">
            ImdbUrl:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="inputImdbUrl"
              onChange={this.handleChange}
              value={inputImdbUrl}
              className="form-control"
              id="inputImdbUrl"
              placeholder="input ImdbUrl here"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              className="button"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
