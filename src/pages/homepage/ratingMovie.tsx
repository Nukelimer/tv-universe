const ratingMovie = async (movieId: number, rating: number) => {
  const fetchData = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem(
      "guest_session_id"
    )}&api_key=${import.meta.env.VITE_MOVIE_APIKEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
      body: `{"value": ${rating}}`,
    }
  );
  return fetchData.json();
};

export default ratingMovie;
