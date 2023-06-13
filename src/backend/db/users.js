import { formatDate } from "../utils/authUtils";


export const users = [
  {
    _id: "KHDkswj122",
    firstName: "Umesh",
    lastName: "Mehta",
    username: "umeshmehta14",
    email: "ishaanmehta782@gmail.com",
    password: "umesh mehta 14",
    createdAt: "2023-06-08T10:30:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
    following: [
      {
        _id: "KJDjkdn54",
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
      },
      {
        _id: "ewdgsHJSB23",
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
      },
      {
        _id: "asdfDFG324",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
      },
      {
        _id: "wefHJV64",
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "JHvqshg756",
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
      },
      {
        _id: "IHfhv88",
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Hello, i am the developer of this website",
    portfolio: "https://umeshmehta.netlify.app/",
  },

 // 2 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  {
    _id: "sdfh654",
    firstName: "Sarah",
    lastName: "Walkman",
    username: "SarahW",
    email: "sarahwalkman@example.com",
    password: "sarahWalkman123",
    createdAt: "2023-06-07T09:15:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
    following: [
      {
        _id: "sdfgCV345",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "ijhgsHJS53",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "asdfDF3434G",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
    ],
    bookmarks: [],
    bio: "Passionate about photography and traveling.",
    portfolio: "https://sarahwalkmanportfolio.com/",
  },


  // 3 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


  {
    _id: "asd891",
    firstName: "Lizzie",
    lastName: "Anne",
    username: "itsLizzie",
    email: "lizzieanne@example.com",
    password: "lizzieAnne123",
    createdAt: "2023-06-05T13:45:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
    following: [
      {
        _id: "SDDsdfg1234",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "asdERTY45",
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "ewdfFRGH356",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
    ],
    bookmarks: [],
    bio: "Exploring the world, one adventure at a time.",
    portfolio: "https://lizzieannephotography.com/",
  },


  // 4 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  
  {
    _id: "qwe456",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    email: "janedoe@example.com",
    password: "janeDoe123",
    createdAt: "2023-06-04T08:20:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
    following: [
      {
        _id: "JSDBdfjn123",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "FGNedrfgt1234",
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "SDFGwer1234",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
    ],
    bookmarks: [],
    bio: "Passionate about art and creativity.",
    portfolio: "https://janedoecreations.com/",
  },
  
  
  // 5 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  

  {
    _id: "zxc789",
    firstName: "Kalu",
    lastName: "Don",
    username: "kaludon",
    email: "kaludon@example.com",
    password: "kaludon123",
    createdAt: "2023-06-02T15:40:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
    following: [
      {
        _id: "KBJDibjdc123",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfnjJN34",
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "DFGdfg1234",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfSDFG123",
        firstName: "Lizzie",
        lastName: "Anne",
        username: "itsLizzie",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.-PvVHEASOrJGZCbM2JaYIwHaFR&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Software engineer by profession, and a music lover.",
    portfolio: "https://kaludonportfolio.com/",
  },

  // 6 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  {
    _id: "vbn123",
    firstName: "Emily",
    lastName: "Jones",
    username: "emilyj",
    email: "emilyjones@example.com",
    password: "emilyJones123",
    createdAt: "2023-06-01T11:10:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
    following: [
      {
        _id: "sdfDFGH4567",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
    ],
    followers: [
      {
        _id: "SDF1234kkmd",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfDF345",
        firstName: "Sarah",
        lastName: "Walkman",
        username: "SarahW",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.TPxIaCG4-TJtY5rKtkBhyAHaKk&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Passionate about photography and capturing beautiful moments.",
    portfolio: "https://emilyjonesphotography.com/",
  },


  // 7 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  
  {
    _id: "mnb789",
    firstName: "David",
    lastName: "Brown",
    username: "davidb",
    email: "davidbrown@example.com",
    password: "davidBrown123",
    createdAt: "2023-05-30T14:55:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
    following: [
      {
        _id: "SDFefg1234",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfSDFG2134",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "SDFerf345",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfDFG324",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        avatarURL: "https://tse2.mm.bing.net/th?id=OIP.vwcPJxPIrqD9rko7G49EuAHaJ_&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Avid reader, writer, and lover of all things literary.",
    portfolio: "https://davidbrownbooks.com/",
  },


  // 8 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  {
    _id: "poi098",
    firstName: "Sophie",
    lastName: "Taylor",
    username: "sophiet",
    email: "sophietaylor@example.com",
    password: "sophieTaylor123",
    createdAt: "2023-05-28T10:05:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse1.mm.bing.net/th?id=OIP.sWEjM58oebkZoo9RYmdUAgHaHa&pid=Api&P=0&h=180",
    following: [
      {
        _id: "sdsdfF123",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
    ],
    followers: [
      {
        _id: "DFkjnm987",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "scdvfDSF12",
        firstName: "Kalu",
        lastName: "Don",
        username: "kaludon",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.V_s1iLCrz_ILH3d36HxkQQHaEL&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Passionate about fashion, styling, and all things glamorous.",
    portfolio: "https://sophietaylorfashion.com/",
  },

  // 9 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



  {
    _id: "lkj321",
    firstName: "Michael",
    lastName: "Clark",
    username: "michaelc",
    email: "michaelclark@example.com",
    password: "michaelClark123",
    createdAt: "2023-05-26T09:45:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse1.mm.bing.net/th?id=OIP.rmSShc82nBX9dJKLK2vUgAHaFi&pid=Api&P=0&h=180",
    following: [
      {
        _id: "SDFG123455",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "SDVFewr455",
        firstName: "Emily",
        lastName: "Jones",
        username: "emilyj",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "dfDF234",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "sdfDFG234",
        firstName: "Emily",
        lastName: "Jones",
        username: "emilyj",
        avatarURL: "https://tse3.mm.bing.net/th?id=OIP.90k35a_1M3kSF7TRr8lBOAHaKt&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Fitness enthusiast and advocate for a healthy lifestyle.",
    portfolio: "https://michaelclarkfitness.com/",
  },


  // 10 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  
  {
    _id: "zxc098",
    firstName: "Olivia",
    lastName: "Davis",
    username: "oliviad",
    email: "oliviadavis@example.com",
    password: "oliviaDavis123",
    createdAt: "2023-05-24T12:30:00Z",
    updatedAt: formatDate(),
    avatarURL: "https://tse4.mm.bing.net/th?id=OIP.n8t0NeIiY1C_QXGOYwFyVAHaEK&pid=Api&P=0&h=180",
    following: [
      {
        _id: "SDF234Hdf",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "dfgDF456",
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL: "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
      },
    ],
    followers: [
      {
        _id: "ASDwer2345",
        firstName: "Umesh",
        lastName: "Mehta",
        username: "umeshmehta14",
        avatarURL: "https://res.cloudinary.com/dve78wpnn/image/upload/v1686307561/PicsArt_02-14-11.20.44_pkkfee.jpg",
      },
      {
        _id: "dgfDFG2345",
        firstName: "David",
        lastName: "Brown",
        username: "davidb",
        avatarURL: "https://tse1.mm.bing.net/th?id=OIP.34jQmBtI9wJKevMtcL9ZZgHaHa&pid=Api&P=0&h=180",
      },
    ],
    bookmarks: [],
    bio: "Travel enthusiast, adventure seeker, and nature lover.",
    portfolio: "https://oliviadavisadventures.com/",
  }
];
