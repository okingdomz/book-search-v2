const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user){
            const foundUser = await User.findOne({ _id: context.user._id })
            // return UserData
         return foundUser
        }
        throw new AuthenticationError('must be signed in!')
    }
  },

  Mutation: {
    addUser: async (parent, args, context) => {
        const user = await User.create(args);
        const token = signToken(user);

        return{ user, token };
    },

    login: async (parent, { email, password }, context) => {
        const user = await User.findOne( { email });
        if(!user) {
          throw new AuthenticationError('wrong user information gang')
        }
        const correctPw = await user.isCorrectPassword(password);
        if(!correctPw) {
          throw new AuthenticationError('wrong password information gango')
        }
        const token = signToken(user);
        return { user, token };
    },

    saveBook: async (parent, { book }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate({ _id: context.user._id },  { $addToSet: { savedBooks: book } },
            { new: true, runValidators: true })
          return updatedUser;
        }
        throw new AuthenticationError('You need to log in gang')
    },

    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate ({ _id: context.user._id}, { $pull: { savedBooks: { bookId: bookId } } }, { new: true }
          )
          return updatedUser;
        }
    },
  },
};

module.exports = resolvers;
