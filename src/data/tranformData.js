

export const normalizeStringForURL = (str) => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const NormalizedMovieNames = (movies) => {
  const normalizedNames = movies.map(movie => ({
    movie: movie.object.name,
    name: normalizeStringForURL(movie.object.name),
  }));

  return normalizedNames;
};

export const NormalizedMovieNamesTime = (movies) => {
  const normalizedNames = movies.map(movie => ({
    movie: movie.object.movie.name,
    name: normalizeStringForURL(movie.object.movie.name),
  }));

  return normalizedNames;
};


export const findName = (movies, prama) => {
  const foundMovie = movies.find(movie => movie.name.toLowerCase() === prama.toLowerCase());
  if (foundMovie) {
    return foundMovie.movie;
  } else {
    return '';
  }
};

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item.object.movie[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

// Hàm lấy ngày bắt đầu và kết thúc
export const getMinMaxDates = (dates) => {
  const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
  return { min: sortedDates[0], max: sortedDates[sortedDates.length - 1] };
};
