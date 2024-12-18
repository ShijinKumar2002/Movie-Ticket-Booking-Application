const Movie = require("../models/MovieInformation.models"); // Assuming Movie model is defined correctly

// Get all movies
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.find({});
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

const getMovies = async (req, res) => {
  try {
    let { movieId } = req.params;
    const movies = await Movie.findOne({movieId});
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { movieTitle, genreTitle, language, releaseDate, duration, ageRating, description } = req.body;

    // Check for required fields
    if (!movieTitle || !genreTitle || !language || !releaseDate || !duration || !ageRating) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Handle file uploads: Extract only file names
    const movieImage = req.files?.["movieImage"] ? req.files["movieImage"][0].filename : null;
    const posterImage = req.files?.["posterImage"] ? req.files["posterImage"][0].filename : null;

    // Create a new movie document
    const movie = new Movie({
      movieTitle,
      genreTitle,
      language,
      releaseDate,
      duration,
      ageRating,
      description,
      movieImage,
      posterImage,
    });

    // Save the movie
    await movie.save();

    // Send success response
    res.status(201).json({ message: "Movie saved successfully!", movieId: movie._id, movie });
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ message: "Failed to save movie", error: error.message });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find and delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully!" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

module.exports = {getMovie, getMovies, addMovie, deleteMovie };
