import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';

// eslint-disable-next-line
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgValid: false,
    imdbValid: false,
  };

  validateUrl = () => (
    this.setState(prevState => ({
      imgValid: regex.test(prevState.imgUrl),
      imdbValid: regex.test(prevState.imdbUrl),
    }))
  )

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
    this.validateUrl();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgValid,
      imdbValid,
    } = this.state;

    const buttonCheck = Object.values(this.state).some(
      value => !value,
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
        >
          <Grid item>
            <TextField
              name="title"
              required
              value={title}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter movie title"
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              required
              value={description}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter movie description"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imgUrl"
              required
              value={imgUrl}
              error={!imgValid}
              helperText={!imgValid && 'incorrect image URL'}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter image URL"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imdbUrl"
              required
              value={imdbUrl}
              error={!imdbValid}
              helperText={!imdbValid && 'incorrect IMDB URL'}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter IMDB URL"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imdbId"
              required
              value={imdbId}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter IMDB ID"
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={buttonCheck}
            >
              Add movie!
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: propTypes.func.isRequired,
};
