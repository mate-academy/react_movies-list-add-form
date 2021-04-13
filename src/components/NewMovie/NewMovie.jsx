import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
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
    } = this.state;

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
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter cover URL"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imdbUrl"
              required
              value={imdbUrl}
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
