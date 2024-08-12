import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo một async thunk để gọi API
export const getMovie = createAsyncThunk('auth/getMovie', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movies?size=50',{
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getMovieById = createAsyncThunk('auth/getMovieById', async (id, { rejectWithValue }) => {

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/movies/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getMovieCurrent = createAsyncThunk('auth/getMovieCurrent', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movies/current?size=50');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getMovieUpcoming = createAsyncThunk('auth/getMovieUpcoming', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movies/upcoming?size=50');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const getMovieGenre = createAsyncThunk('auth/getMovieGenre', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movie-genres?size=50',{
      headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getMovieCast = createAsyncThunk('auth/getMovieCast', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movie-casts?size=50',{
      headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addMovie = createAsyncThunk('auth/addMovie', async ({ formData, genres, casts, director }, { dispatch, rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/movies', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });


    const id = response.data.data.object.id;

    const transformedGenres = genres.map((genre) => ({
      id: genre.value
    }));


    const transformedCast = casts.map((cast) => ({
      cast: {
        id: cast.value
      },
      roleCast: 2
    }));

    const transformedDirector = [{
      cast: {
        id: director.value
      },
      roleCast: 1
    }];
    await dispatch(addGenreToMovie({ id, genres: transformedGenres }));
    await dispatch(addCastToMovie({ id, casts: transformedCast }));
    await dispatch(addCastToMovie({ id, casts: transformedDirector }));

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteMovie = createAsyncThunk('auth/deleteMovie', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addGenreToMovie = createAsyncThunk('auth/addGenreToMovie', async ({ id, genres }, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/movie-genres', {
      movie: {
        id: id
      },
      genres: genres
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addCastToMovie = createAsyncThunk('auth/addCastToMovie', async ({ id, casts }, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/movie-casts', {
      movie: {
        id: id
      },
      casts: casts
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const editMovie = createAsyncThunk('auth/updateMovie', async ({ id, formData, genres, casts, director, cast_id, genre_id }, { dispatch, rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.put(`http://localhost:8080/api/v1/movies/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (genre_id && cast_id) {
      await Promise.all(cast_id.map(castId => dispatch(deleteMovieCast(castId.id)).unwrap()));
      await Promise.all(genre_id.map(genreId => dispatch(deleteMovieGenre(genreId.id)).unwrap()));
    }

    const transformedGenres = genres.map((genre) => ({
      id: genre.value
    }));

    const transformedCast = casts.map((cast) => ({
      cast: {
        id: cast.value
      },
      roleCast: 2
    }));

    const transformedDirector = [{
      cast: {
        id: director.value
      },
      roleCast: 1
    }];
    await dispatch(addGenreToMovie({ id, genres: transformedGenres }));
    await dispatch(addCastToMovie({ id, casts: transformedCast }));
    await dispatch(addCastToMovie({ id, casts: transformedDirector }));

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteMovieGenre = createAsyncThunk('auth/deleteMovieGenre', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/movie-genres/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const deleteMovieCast = createAsyncThunk('auth/deleteMovieCast', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/movie-casts/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    date:'',
    time: '',
    data: [],
    current:[],
    upcoming:[],
    movie:[],
    genre_id: [],
    cast_id: [],
    movieGenre: [],
    movieCast: [],
    status: 'idle',
    error: null,
    loading: false,
    success: false,
    name: '',
    releaseDate: '',
    image: null,
    overview: '',
    trailer: '',
    duration: '',
    genres: null,
    casts: null,
    genre: null,
    cast: null,
    director: null,
    isEdit: false,
    id: '',
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setReleaseDate: (state, action) => { state.releaseDate = action.payload },
    setSuccess: (state) => { state.success = false },
    setDate: (state, action) => { state.date = action.payload},
    setTime: (state, action) => { state.time = action.payload},
    setError: (state) => { state.error = null },
    setEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setId: (state, action) => { state.id = action.payload; },
    setCastId: (state, action) => { state.cast_id = action.payload; },
    setGenreId: (state, action) => { state.genre_id = action.payload; },
    setImage: (state, action) => { state.image = action.payload },
    setOverview: (state, action) => { state.overview = action.payload },
    setTrailer: (state, action) => { state.trailer = action.payload },
    setDuration: (state, action) => { state.duration = action.payload },
    addGenre: (state, action) => {
      state.genres = (action.payload);
    },
    addCast: (state, action) => {
      state.casts = (action.payload);
    },
    setGenre: (state, action) => {
      state.genre = (action.payload);
    },
    setCast: (state, action) => {
      state.cast = (action.payload);
    },
    addDirector: (state, action) => {
      state.director = (action.payload);
    },
    clearForm: (state) => { state.date = ''; state.time = ''; state.name = ''; state.releaseDate = ''; state.image = null; state.overview = ''; state.trailer = ''; state.duration = ''; state.casts = null; state.genres = null; state.director = null; state.isEdit = false; }
  },
  extraReducers: (builder) => {
    builder
      
    .addCase(getMovie.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getMovieById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getMovieCurrent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovieCurrent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(getMovieCurrent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getMovieUpcoming.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovieUpcoming.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcoming = action.payload;
      })
      .addCase(getMovieUpcoming.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getMovieGenre.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovieGenre.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieGenre = action.payload;
      })
      .addCase(getMovieGenre.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getMovieCast.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovieCast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieCast = action.payload;
      })
      .addCase(getMovieCast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDate, setTime, setCastId, setGenreId, setEdit, setError, setSuccess, setName, setReleaseDate, setImage, setOverview, setTrailer, setDuration, addCast, addDirector, addGenre, clearForm, setCast, setGenre, setId } = dataSlice.actions;

export default dataSlice.reducer;
