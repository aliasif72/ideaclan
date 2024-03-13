const Movie = require('./models/movie');
const User = require('./models/user');
const bcrypt=require('bcryptjs');

const resolvers = {
    Query: {
        getUser: async (source, args) => {
               const { email, password } = args
                try {
                    const exist = await User.findOne({ email: email })
                    if (exist == null) {
                        return res.status(404);
                        //.json("User doesn't exist");
                    }
                    bcrypt.compare(password, exist.password, (err, result) => {
                        if (result) {
                            console.log(exist);
                            return res.status(201).json({
                                message: "Login success",
                                token: generateToken(
                                    exist._id,
                                    exist.email,
                                    exist.isAdmin
                                ),
                            });
                        }
                        return res.status(401);
                        //json("User not authorized");
                    });
                }
                catch (err) {
                    console.log(err);
                }

                //function for creating token
                function generateToken(id, email, isAdmin) {
                    return jwt.sign({ userId: id, name: email, isPremium: isAdmin }, "asifali");
                }
              },
        getMovies: async (source, args) => {
            try {
                const movies = await Movie.find({});
                return movies;
            }
            catch (err) {
                throw new Error("Error retrieving Movies");
            }
        },
        getMovie: async (source, args) => {
            try {
                const movie = await findById(args.id);
                return movie;
            }
            catch (err) {
                throw new Error("Error retrieving Movie");
            }
        }
    },

    Mutation: {
        addUser: async (source, args) => {
            try {
                console.log("jkj")
                
                const { name, email, password } = args;
                const exist = await User.findOne({ email: email });
                if (exist) {
                    console.log("USER ALREADY EXIST");
                              return {message:"USER ALREADY EXIST"};    
                             }
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, async(err, hash) => {
                    const user=await User.create({
                        name: name,
                        email: email,
                        password: hash,
                    })
                    console.log(user)
                      return user;
          })
        }
            catch (err) {
                console.log(err)
                //throw new Error("Error adding user");
            }
        },
        addMovie: async (source, args) => {
            try {
                let Movie = new Movie({
                    name: args.name,
                    producer: args.producer,
                    rating: args.rating,
                });
                await Movie.save();
                return Movie;
            }
            catch (err) {
                throw new Error("Error adding movie");
            }
        },
        updateMovie: async (source, args) => {
            try {
                let updatedMovie = await Movie.findById(args.id);
                updatedMovie.name = args.name,
                    updatedMovie.producer = args.producer,
                    updatedMovie.rating = args.rating,
                    await updatedMovie.save();
                return updatedMovie;
            }
            catch (err) {
                throw new Error("Error updating the movie")
            }
        },
        deleteMovie: async (source, args) => {
            try {
                const deletedMovie = await Movie.findByIdAndRemove(id);
                return user;
            } catch (err) {
                throw new Error("Error deleting user");
            }
        },
    }
}

module.exports =  resolvers ;
