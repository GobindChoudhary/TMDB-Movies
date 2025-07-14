import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yzk2MDhmNzQzYmQzOTAxM2RiMzJmMmU4MjcxNTc4ZCIsIm5iZiI6MTcyOTc5MjY0OC4wMTksInN1YiI6IjY3MWE4YTg4Yzc4MDJjYzUwMzU5ZGI2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2vbmcYELhFHw--R0PdXMkIYFWfbNwPY9a0YBYONQki8",
  },
});
export default instance;
