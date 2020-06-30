/* eslint-disable no-console */
import React, { Component } from 'react';
import { number } from 'prop-types';
import { Field } from '../Field/Field';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleError: '',
  descriptionError: '',
  imgUrlError: '',
  imdbUrlError: '',
  imdbIdError: '',
};

const allValid = {
  title: 0,
  description: 1,
  imgUrl: 2,
  imdbUrl: 3,
  imdbId: 4,
};

const valid = [false, false, false, false, false];
let fields = ['title', 'description', 'imdbUrl', 'imdbId', 'imgUrl']
let disabled = true;
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = initialState;

  handleChange = (ev) => {
    ev.persist();

    return (this.setState(() => ({
      [ev.target.name]: ev.target.value,
    })));
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.addMovie({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });
    this.setState(initialState);
    disabled = true;
  }

  validation = (name, value, option) => {

    if (typeof option === 'number') {
      if (value.length < option) {
        valid[allValid[name]] = false;
        this.setState(() => ({
          [`${name}Error`]: `Must contain at least ${option} characters`,
        }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        valid[allValid[name]] = true;
      }
    } else if (option === 'url') {
      if (!pattern.test(value)) {
        valid[allValid[name]] = false;
        this.setState(() => ({ [`${name}Error`]: 'Enter the correct url' }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        valid[allValid[name]] = true;
      }
    }

    disabled = (!valid.every(el => el === true));
  }

  render() {
    // const { title, description, imdbUrl,
    //   imdbId, imgUrl, titleError,
    //   descriptionError, imdbUrlError,
    //   imdbIdError, imgUrlError } = this.state;

    return (
      <form onSubmit={ev => this.handleSubmit(ev)}>
        <fieldset className="inputs-block">
          <legend>Add a movie</legend>
          {
            fields.map(name => (
              <Field
                name={name}
                value={this.state[name]}
                err={this.state[`${name}Error`]}
                handleChange={this.handleChange}
                validation={this.validation}
              />
            ))
          }

{/*
          <div>
            <input
              value={title}
              placeholder="Title"
              type="text"
              name="title"
              onChange={ev => this.handleChange(ev)}
              onBlur={ev => this.validation(ev.target.name, ev.target.value, 5)}
            />
            <p className="errors">{titleError}</p>
          </div>
          <div className="inputs">
            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={ev => this.handleChange(ev)}
              value={description}
              onBlur={ev => this.validation(ev.target.name, ev.target.value, 30)}
            />
            <p className="errors">{descriptionError}</p>
          </div>
          <div className="inputs">
            <input
              type="text"
              name="imgUrl"
              placeholder="imgURL"
              onChange={ev => this.handleChange(ev)}
              value={imgUrl}
              onBlur={ev => this.validation(ev.target.name, ev.target.value, 'url')}
            />
            <p className="errors">{imgUrlError}</p>
          </div>
          <div className="inputs">
            <input
              type="text"
              name="imdbUrl"
              placeholder="imdbUrl"
              onChange={ev => this.handleChange(ev)}
              value={imdbUrl}
              onBlur={ev => this.validation(ev.target.name, ev.target.value, 'url')}
            />
            <p className="errors">{imdbUrlError}</p>
          </div>
          <div className="inputs">
            <input
              value={imdbId}
              placeholder="imdbId"
              type="text"
              name="imdbId"
              onChange={ev => this.handleChange(ev)}
              onBlur={ev => this.validation(ev.target.name, ev.target.value, 9)}
            />
            <p className="errors">{imdbIdError}</p>
          </div> */}
        </fieldset>
        <input
          disabled={disabled}
          type="submit"
          name="but"
          value="Submit"
        />
      </form>
    );
  }
}
