import { PubSub } from "apollo-server";
import * as data from "./db.json";

const programmers = data.programmers;
const friendships = data.friendships;
const pubsub = new PubSub();

const categoryTypeCheck = (obj) => {
  if (obj.database !== undefined) {
    return "Backend";
  } else if (obj.native !== undefined) {
    return "Frontend";
  } else {
    return null;
  }
};

const getProgrammers = (id = -1) => {
  const selectedProgrammers =
    id === -1
      ? programmers
      : programmers.filter((programmer) => programmer.id === id);

  const resultProgrammers = selectedProgrammers.map((programmer) => {
    programmer.friends = friendships.reduce((friendsList, friendship) => {
      if (
        programmer.id === friendship.friend_a ||
        programmer.id === friendship.friend_b
      )
        friendsList.push({
          id: friendship.id,
          friend_a: programmers.filter(
            (programmer) => programmer.id === friendship.friend_a
          )[0],
          friend_b: programmers.filter(
            (programmer) => programmer.id === friendship.friend_b
          )[0],
          metYear: friendship.metYear,
        });

      return friendsList;
    }, []);

    return programmer;
  });

  if (resultProgrammers.length === 0) return;

  return id === -1 ? resultProgrammers : resultProgrammers[0];
};

const addProgrammer = (input) => {
  const newProgrammer = {
    id: programmers.length + 1,
    name: input.name,
    gender: input.gender,
    grades: input.grades,
    address: {
      location: input.addressLocation,
      detail: input.addressDetail ? input.addressDetail : "",
    },
    category: {
      frameworks: input.frameworks,
    },
    friendship_ids: [],
  };

  input.friends.forEach((friendId) => {
    newProgrammer.friendship_ids.push(friendships.length + 1);
    friendships.push({
      id: friendships.length + 1,
      friend_a: programmers.length + 1,
      friend_b: friendId,
      metYear: new Date().getFullYear(),
    });
  });

  if (input.category === "Frontend") {
    newProgrammer.category.native = input.native ? input.native : false;
  } else if (input.category === "Backend") {
    newProgrammer.category.database = input.database ? input.database : [];
  } else {
    return;
  }

  programmers.push(newProgrammer);
  pubsub.publish("programmerAdded", {
    programmerAdded: newProgrammer,
  });
  return newProgrammer;
};

const resolvers = {
  Category: {
    __resolveType: (obj, context, info) => categoryTypeCheck(obj),
  },
  Query: {
    programmers: () => getProgrammers(),
    programmer: (_, { id }) => getProgrammers(id),
  },
  Mutation: {
    addProgrammer: (_, { input }) => addProgrammer(input),
  },
  Subscription: {
    programmerAdded: {
      subscribe: () => pubsub.asyncIterator("programmerAdded"),
    },
  },
};

export default resolvers;
