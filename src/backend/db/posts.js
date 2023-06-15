import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const posts = [
  {
    _id: "dofkjnKDJ1234",
    content: "Hello Friends this is my first post",
    mediaUrl:
      "https://tse3.explicit.bing.net/th?id=OIP.AopnIAgmax-I73k7QLucRAHaEA&pid=Api&P=0&h=180",
    likes: {
      likeCount: 4,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T12:31:25Z",
    updatedAt: formatDate(),
    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "yeah Boiii",
        createdAt: "2023-04-07T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Wow!",
        createdAt: "2023-04-08T12:31:25Z",
      },
    ],
  },

  {
    _id: uuid(),
    content: "How's My New Watch",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.pFAbl8r_D9qwM25VPR7ThQHaHa&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Olivia",
          lastName: "Davis",
          username: "oliviad",
          avatarURL:
            "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "davidb",
    firstName: "David",
    lastName: "Brown",
    createdAt: "2023-04-10T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Very Nice",
        createdAt: "2023-04-07T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Tera ghar jayenga isme",
        createdAt: "2023-04-08T12:31:25Z",
      },
    ],
  },

  {
    _id: "sdfvIUH765",
    content: "Celebrating a friend's birthday!",
    mediaUrl:
      "https://tse4.mm.bing.net/th?id=OIP.qgkQUOdXBCeR2hd69E5WogHaF0&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        text: "Happy birthday!",
        createdAt: "2023-06-09T10:35:00Z",
      },
      {
        _id: uuid(),
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        text: "Wishing you a fantastic year ahead!",
        createdAt: "2023-06-09T10:40:00Z",
      },
    ],
  },

  {
    _id: uuid(),
    content: "InstaVerse Is very nice",
    mediaUrl:
      "https://tse3.explicit.bing.net/th?id=OIP.F55RSZzK4rtGw9WaBFnM8gHaFt&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Olivia",
          lastName: "Davis",
          username: "oliviad",
          avatarURL:
            "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "kaludon",
    firstName: "Kalu",
    lastName: "Don",
    createdAt: "2023-06-11T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
    comments: [],
  },

  {
    _id: uuid(),
    content: "My New Puppy!! So cute....",
    mediaUrl:
      "https://tse4.mm.bing.net/th?id=OIP.zko-q1wTP2-niX0znNfjkQHaGc&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Olivia",
          lastName: "Davis",
          username: "oliviad",
          avatarURL:
            "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    firstName: "Emily",
    lastName: "Jones",
    username: "emilyj",
    createdAt: "2023-04-10T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "so cuteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        createdAt: "2023-06-02T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Seems like you",
        createdAt: "2023-06-08T12:31:25Z",
      },
    ],
  },

  {
    _id: "ijuhgKJH23",
    content: "Enjoying a beautiful sunset!",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.WoAgzV0eIeskv3pHgz9krQHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://res.cloudinary.com/dodkrr6ce/image/upload/v1652181761/socmedia/pic3_py263g.jpg",
        },
      ],
      dislikedBy: [],
    },
    username: "itsLizzie",
    firstName: "Lizzie",
    lastName: "Anne",
    createdAt: "2023-05-01T18:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Beautiful photo, Lizzie!",
        createdAt: "2023-04-21T09:45:00Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Wow, I wish I was there!",
        createdAt: "2023-03-22T12:20:00Z",
      },
    ],
  },

  {
    _id: "khgvKJHHBVB123",
    content: "New recipe experiment!",
    mediaUrl:
      "https://tse4.mm.bing.net/th?id=OIP.GjIwCh89aXCNSbCMbriWkwHaE7&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Michael",
          lastName: "Clark",
          username: "michaelc",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "SarahW",
    firstName: "Sarah",
    lastName: "Walkman",
    createdAt: "2023-06-11T11:20:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL:
          "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        text: "Looks delicious!",
        createdAt: "2023-06-12T13:45:00Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Can't wait to try it!",
        createdAt: "2023-06-13T10:30:00Z",
      },
    ],
  },

  {
    _id: "JKHGuyt654",
    content: "Attending an amazing concert tonight!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.Tdf7jHlTZ5-p7QYF_WKd9AHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "oliviad",
    firstName: "Olivia",
    lastName: "Davis",
    createdAt: "2023-06-10T17:45:00Z",
    updatedAt: formatDate(),
    avatarURL:
      "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "Enjoy the show!",
        createdAt: "2023-06-10T19:10:00Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "I heard they're amazing live!",
        createdAt: "2023-06-10T19:30:00Z",
      },
    ],
  },

  {
    _id: "jhbIUY786",
    content: "Exploring new places!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.WFu_JQeFnS7B09eB9YWiGwHaEA&pid=Api&P=0&h=180",
    likes: {
      likeCount: 6,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "SarahW",
    firstName: "Sarah",
    lastName: "Walkman",
    createdAt: "2023-06-09T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL:
          "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        text: "Looks like a beautiful place!",
        createdAt: "2023-06-10T11:30:00Z",
      },
    ],
  },

  {
    _id: "LKJHoiuyt9876#$",
    content:
      "Attended a cooking class today and learned how to make delicious pasta from scratch. #CookingClass #Foodie",
    mediaUrl:
      "https://tse4.mm.bing.net/th?id=OIP.HfKR_Le9hoRNve9BNTD_3AHaE7&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Michael",
          lastName: "Clark",
          username: "michaelc",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-14T15:40:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I'm a huge fan of pasta! Mind sharing the recipe? 😄",
        createdAt: "2023-06-14T16:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "Cooking classes are always so much fun! Let me know when you're serving that pasta. 😋",
        createdAt: "2023-06-14T17:15:00Z",
      },
    ],
  },

  {
    _id: "kjhbJHBB12",
    content: "Feeling grateful!",
    mediaUrl:
      "https://tse4.mm.bing.net/th?id=OIP.lHI5Hi8f3ymUyq47SxYlHQEsEs&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "itsLizzie",
    firstName: "Lizzie",
    lastName: "Anne",
    createdAt: "2023-06-09T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
    comments: [],
  },

  {
    _id: "KJHKJ2jhg",
    content: "Having a great time!",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.C8iuOh4GCiQoMsYT-HfuFQHaFc&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Adarsh",
          lastName: "Balika",
          username: "adarshbalika",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-09T12:31:25Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Looks like fun!",
        createdAt: "2023-06-10T16:20:00Z",
      },
    ],
  },

  {
    _id: "lkjhLKJH765",
    content: "Excited for the weekend!",
    mediaUrl:
      "https://tse2.explicit.bing.net/th?id=OIP.Ndv5TyAyCEr8EF6Dv93sFQHaFQ&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        text: "Have a great weekend!",
        createdAt: "2023-06-09T14:55:00Z",
      },
    ],
  },

  {
    _id: "jkhgKJHG9876",
    content: "Enjoying a beautiful sunset at the beach!",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.LzauqY-_fni5YUjW0xc4QQHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Olivia",
          lastName: "Davis",
          username: "oliviad",
          avatarURL:
            "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "michaelc",
    firstName: "Michael",
    lastName: "Clark",
    createdAt: "2023-06-09T09:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Stunning view!",
        createdAt: "2023-06-09T10:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "I wish I could be there!",
        createdAt: "2023-06-09T11:30:00Z",
      },
    ],
  },

  {
    _id: "wdef234dcvSD",
    content: "Exploring a new city",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.2-52qpEZXfrZQoskBC81LAHaEn&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "SarahW",
    firstName: "Sarah",
    lastName: "Walkman",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),
    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
    comments: [],
  },

  {
    _id: "JKHjkh7654",
    content: "Enjoying a beautiful day!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.B5Fd3DidzpcBePBEaw3fqwHaEo&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T08:45:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Absolutely stunning!",
        createdAt: "2023-06-09T08:50:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Wow, what a view!",
        createdAt: "2023-06-09T08:55:00Z",
      },
    ],
  },

  {
    _id: "JHiuyt98765",
    content:
      "Attended a fascinating tech conference today. So many exciting innovations! #TechConference #Innovation",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.8kmffC1mmWunMVp6YI8BYwHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-13T11:10:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I wish I could have been there! Any key takeaways from the conference?",
        createdAt: "2023-06-01T11:45:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "I heard it was an amazing event. Can't wait to hear about your experience!",
        createdAt: "2023-06-15T13:00:00Z",
      },
    ],
  },

  {
    _id: "kljhKJHG8765",
    content: "Exploring new hiking trails!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.0S6csWU_qfJXu3S7lHu1ZAHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T09:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        text: "Looks like an amazing trail!",
        createdAt: "2023-06-09T09:20:00Z",
      },
      {
        _id: uuid(),
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        text: "I need to visit that place!",
        createdAt: "2023-06-09T09:25:00Z",
      },
    ],
  },

  {
    _id: "pjkhOIUYT98765",
    content: "Just had an amazing day at the beach!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.hOlk0w05OLs3BXnUWLoKqQHaEo&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "oliviad",
    firstName: "Olivia",
    lastName: "Davis",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Sounds amazing!",
        createdAt: "2023-06-08T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I wish I could be there!",
        createdAt: "2023-06-08T13:45:10Z",
      },
    ],
  },

  {
    _id: "kjhIU987",
    content: "Trying out new recipes!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.UtxJhFcO5AiFzqJSt50NKAHaE3&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T09:45:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "Looks delicious!",
        createdAt: "2023-06-09T09:50:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "I want the recipe!",
        createdAt: "2023-06-09T09:55:00Z",
      },
    ],
  },

  {
    _id: "jkhgOIUY987",
    content: "Trying out new recipes in the kitchen!",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.5YfmpyiEJZ1l6z1L4Q0fLgHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "michaelc",
    firstName: "Michael",
    lastName: "Clark",
    createdAt: "2023-06-11T11:10:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "The food looks delicious!",
        createdAt: "2023-06-11T11:45:00Z",
      },
      {
        _id: uuid(),
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL:
          "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        text: "Can you share the recipe?",
        createdAt: "2023-06-11T12:30:00Z",
      },
    ],
  },

  {
    _id: "jkhKJHG987",
    content:
      "Enjoying a relaxing Sunday afternoon with a good book. #SundayVibes #Bookworm",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.JwyKjsZJrKKlje-NDjgr_wHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Michael",
          lastName: "Clark",
          username: "michaelc",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-12T09:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "Sounds like the perfect way to spend the day!",
        createdAt: "2023-06-13T10:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Which book are you reading? I need some recommendations!",
        createdAt: "2023-06-15T11:15:00Z",
      },
    ],
  },

  {
    _id: "JHGjhg567",
    content: "Exploring the beautiful mountains",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.Q5qWgU5K29v8uMzE3-VCjwHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Umesh",
          lastName: "Mehta",
          username: "umeshmehta14",
          avatarURL:
            "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    firstName: "Emily",
    lastName: "Jones",
    username: "emilyj",
    createdAt: "2023-06-09T12:00:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL:
          "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
        text: "Amazing view!",
        createdAt: "2023-06-09T12:05:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Wish I could be there!",
        createdAt: "2023-06-09T12:10:00Z",
      },
    ],
  },

  {
    _id: "LKJHiuy876",
    content: "Enjoying a delicious meal at my favorite restaurant!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.1iSfM6HjeIMKhWt0MytsRQHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "oliviad",
    firstName: "Olivia",
    lastName: "Davis",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Looks delicious!",
        createdAt: "2023-06-08T11:50:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "I'm glad you're enjoying it!",
        createdAt: "2023-06-08T12:15:00Z",
      },
    ],
  },

  {
    _id: "JKHGjkhg876",
    content: "Enjoying a delicious meal with friends",
    mediaUrl:
      "https://tse3.explicit.bing.net/th?id=OIP._IfgNggtzo74efI0MNfP5QHaEN&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T12:00:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "That looks delicious!",
        createdAt: "2023-06-09T12:05:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "I'm hungry now!",
        createdAt: "2023-06-09T12:10:00Z",
      },
    ],
  },

  {
    _id: "JHuyt6543",
    content: "Exploring the mountains on a hiking adventure!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.WVQPs7M9IQnhcfY6p9J-bAHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 5,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Emily",
          lastName: "Jones",
          username: "emilyj",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "michaelc",
    firstName: "Michael",
    lastName: "Clark",
    createdAt: "2023-06-10T14:20:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "The view must be breathtaking!",
        createdAt: "2023-06-10T15:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "I love hiking too!",
        createdAt: "2023-06-10T16:30:00Z",
      },
    ],
  },

  {
    _id: "jhgIUY987nb",
    content: "Just finished reading a great book. Highly recommend it!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.mPNyl0t4UZw4jzZkhn_M1AHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Olivia",
          lastName: "Davis",
          username: "oliviad",
          avatarURL:
            "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "kaludon",
    firstName: "Kalu",
    lastName: "Don",
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "I've been meaning to read that book. Thanks for the recommendation!",
        createdAt: "2023-06-10T10:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I loved that book too! It's a must-read.",
        createdAt: "2023-06-10T11:20:00Z",
      },
    ],
  },

  {
    _id: "jkhgoiuOIU89765",
    content: "Attended a fascinating conference today. Learned so much!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.hORRikbO-VZjPC8zZevtjgHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "David",
          lastName: "Brown",
          username: "davidb",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "kaludon",
    firstName: "Kalu",
    lastName: "Don",
    createdAt: "2023-06-11T14:20:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "The city looks amazing!",
        createdAt: "2023-06-13T13:30:00Z",
      },
      {
        _id: uuid(),
        irstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "Have fun exploring!",
        createdAt: "2023-06-13T14:45:00Z",
      },
    ],
  },

  {
    _id: "JKHGiuy98765",
    content:
      "Exploring new coffee shops in the city. ☕️ #CoffeeLover #CityLife",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.gNiGdodNdn2Bck61_x18dAHaFi&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "David",
          lastName: "Brown",
          username: "davidb",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-08T14:20:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Sophie",
        lastName: "Taylor",
        username: "sophiet",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        text: "Let me know if you find any hidden gems! I'm always up for a good cup of coffee.",
        createdAt: "2023-06-06T15:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I recommend trying out the new coffee shop on Elm Street. They have amazing lattes!",
        createdAt: "2023-06-16T16:15:00Z",
      },
    ],
  },

  {
    _id: "dfDFG1234",
    content: "Enjoying a scenic hike",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.co570r4uY7D_UOTKQfQSWAHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T12:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "Beautiful view!",
        createdAt: "2023-06-09T12:35:00Z",
      },
      {
        _id: uuid(),
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        text: "I love hiking!",
        createdAt: "2023-06-09T12:40:00Z",
      },
    ],
  },

  {
    _id: "LKJoiuy8765",
    content: "Exploring the vibrant city",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.DEgMLdRr5MKPpDzRZABSKwHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Lizzie",
          lastName: "Anne",
          username: "itsLizzie",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T13:00:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
        text: "The city looks so lively!",
        createdAt: "2023-06-09T13:05:00Z",
      },
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "I want to visit!",
        createdAt: "2023-06-09T13:10:00Z",
      },
    ],
  },

  {
    _id: "kjhOIUY9087",
    content: "Exploring the city's hidden gems!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.gQo3jNrqBYk_ro_6lRgQqgHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sophie",
          lastName: "Taylor",
          username: "sophiet",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "michaelc",
    firstName: "Michael",
    lastName: "Clark",
    createdAt: "2023-06-13T12:55:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "The city looks amazing!",
        createdAt: "2023-06-13T13:30:00Z",
      },
      {
        _id: uuid(),
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        text: "Have fun exploring!",
        createdAt: "2023-06-13T14:45:00Z",
      },
    ],
  },

  {
    _id: "KJHGiuyt8765",
    content: "Having a relaxing day at the spa",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.6tKSR5YEfiond9aLjbHbiAHaE1&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Kalu",
          lastName: "Don",
          username: "kaludon",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "umeshmehta14",
    firstName: "Umesh",
    lastName: "Mehta",
    createdAt: "2023-06-09T13:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    comments: [
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL:
          "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        text: "So peaceful!",
        createdAt: "2023-06-09T13:35:00Z",
      },
      {
        _id: uuid(),
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        text: "I need a spa day too!",
        createdAt: "2023-06-09T13:40:00Z",
      },
    ],
  },

  {
    _id: "KJHiuy9876",
    content: "Just had an amazing day at the beach!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.r_J2t-juNLkRZ2O289KBOwHaFj&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "sophiet",
    firstName: "Sophie",
    lastName: "Taylor",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Sounds amazing!",
        createdAt: "2023-06-08T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Michael",
        lastName: "Clark",
        username: "michaelc",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        text: "I wish I could be there!",
        createdAt: "2023-06-08T13:45:10Z",
      },
    ],
  },

  {
    _id: "jhgiuy876",
    content: "Exploring a beautiful hiking trail today!",
    mediaUrl:
      "https://tse3.mm.bing.net/th?id=OIP.DVhvnNDrOYe1OOBmtm0mngHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Michael",
          lastName: "Clark",
          username: "michaelc",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "oliviad",
    firstName: "Olivia",
    lastName: "Davis",
    createdAt: "2023-06-09T09:15:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Emily",
        lastName: "Jones",
        username: "emilyj",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
        text: "The view must be amazing!",
        createdAt: "2023-06-09T10:40:00Z",
      },
      {
        _id: uuid(),
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
        text: "Wish I could join you!",
        createdAt: "2023-06-09T11:05:00Z",
      },
    ],
  },

  {
    _id: "JIHUG987jhg",
    content:
      "Spent the weekend hiking in the mountains. The views were breathtaking! #HikingAdventure #Nature",
    mediaUrl:
      "https://tse2.mm.bing.net/th?id=OIP.4s3Boyd8qtDZpW-B4v78LAHaE8&pid=Api&P=0&h=180",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Michael",
          lastName: "Clark",
          username: "michaelc",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: "2023-06-08T09:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "Olivia",
        lastName: "Davis",
        username: "oliviad",
        avatarURL:
          "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
        text: "I love hiking! Which trail did you take? The mountains are so beautiful.",
        createdAt: "2023-06-18T10:00:00Z",
      },
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "The mountains offer such a peaceful escape. Can't wait to see your photos!",
        createdAt: "2023-06-18T11:15:00Z",
      },
    ],
  },

  {
    _id: "kjhgiuyUYT897",
    content: "Just had an amazing hike in the mountains!",
    mediaUrl:
      "https://tse1.mm.bing.net/th?id=OIP.b1eYLW7DDpBuuTvVZzNBGgHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: uuid(),
          firstName: "Sarah",
          lastName: "Walkman",
          username: "SarahW",
          avatarURL:
            "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          avatarURL:
            "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
        },
        {
          _id: uuid(),
          firstName: "David",
          lastName: "Brown",
          username: "davidb",
          avatarURL:
            "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        },
      ],
      dislikedBy: [],
    },
    username: "michaelc",
    firstName: "Michael",
    lastName: "Clark",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),

    avatarURL:
      "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    comments: [
      {
        _id: uuid(),
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL:
          "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
        text: "Sounds amazing!",
        createdAt: "2023-06-08T12:31:25Z",
      },
      {
        _id: uuid(),
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL:
          "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
        text: "I wish I could be there!",
        createdAt: "2023-06-08T13:45:10Z",
      },
    ],
  },
];

/* basic 
  david - 1
  kalu - 1
  emily
  basic
  lizzie
  sarah
  michael
  lizzie - 2
  olivia 
  jane doe 
  basic
  sarah - 2
  basic
  basic
  michael
  basic
  emily- 2
  michael
  basic
  michael
  basic
  basic
  basic - 10
  sophie - 1
  olivia 
  olivia 
  olivia - 4
  michael - 5
  jane doe- 6
  kalu
  kalu - 3

  = 35
*/
