'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });



const app = express();
app.use(cors());

const PORT = process.env.PORT;

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    imgUrl: String

});


const userSchema = new mongoose.Schema({
    email: String,
    bookies: [bookSchema]

});
// const thirdSchema = new mongoose.Schema({
//     name:'',
//     description:'',
//     imgUrl:''

// })
const booksModel = mongoose.model('first', bookSchema);
//collection names first+s top down user+s
const usersModel = mongoose.model('user', userSchema);
// const secondBook = mongoose.model('second', secondSchema);
// const thirdBook = mongoose.model('third', thirdSchema);

function bookCollectionSeed() {
    const book1 = new booksModel({

        name: 'who moved my cheese',
        description: 'An Amazing Way to Deal with Change in Your Work and in Your Life, published on September 8, 1998, is a motivational business fable. The text describes change in ones work and life, and four typical reactions to those changes by two mice and two Littlepeople, during their hunt for cheese',
        imgUrl: 'https://pbs.twimg.com/profile_images/2562538308/w1os1ywkdpxf4bvq8dnm.jpeg'
    });


    const book2 = new booksModel(
        {
            name: 'The Da Vinci Code',
            description: 'a 2003 mystery thriller novel by Dan Brown. It is Browns second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. ... The book also refers to The Holy Blood and the Holy Grail (1982) though Dan Brown has stated that it was not used as research material.',
            imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/A15FFg6aNLL.jpg'
        });
    const book3 = new booksModel(
        {
            name: 'one no one and one hundred thousand',
            description: 'Pirandellos classic 1925 novel Uno, Nessuno, Centomila (One, No One and One Hundred Thousand) recounts the tragedy of a man who struggles to reclaim a coherent identity for himself in the face of an inherently social and multi–faceted world.',
            imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71X9DBM0KTL.gif'
        });

        book1.save();
        book2.save();
        book3.save();
};
// const davinci = new booksModel({

//     name:'The Da Vinci Code',
// description:'a 2003 mystery thriller novel by Dan Brown. It is Browns second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. ... The book also refers to The Holy Blood and the Holy Grail (1982) though Dan Brown has stated that it was not used as research material.',
// imgUrl:'https://images-na.ssl-images-amazon.com/images/I/A15FFg6aNLL.jpg'

// });
// const oneNoOne = new booksModel({
//     name:'The Da Vinci Code',
// description:'Pirandellos classic 1925 novel Uno, Nessuno, Centomila (One, No One and One Hundred Thousand) recounts the tragedy of a man who struggles to reclaim a coherent identity for himself in the face of an inherently social and multi–faceted world.',
// imgUrl:'https://images-na.ssl-images-amazon.com/images/I/71X9DBM0KTL.gif'

// });

// console.log(cheese);
// console.log(davinci);
// console.log(oneNoOne);

//  to actually save them >> save()
// cheese.save();
// davinci.save();
// oneNoOne.save();


function userCollectionSeed() {
    const firas = new usersModel({

        email: 'x.firashasan@gmail.com',
        bookies: [{

            name: 'who moved my cheese',
            description: 'An Amazing Way to Deal with Change in Your Work and in Your Life, published on September 8, 1998, is a motivational business fable. The text describes change in ones work and life, and four typical reactions to those changes by two mice and two Littlepeople, during their hunt for cheese',
            imgUrl: 'https://pbs.twimg.com/profile_images/2562538308/w1os1ywkdpxf4bvq8dnm.jpeg'
        },
        {
            name: 'The Da Vinci Code',
            description: 'a 2003 mystery thriller novel by Dan Brown. It is Browns second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. ... The book also refers to The Holy Blood and the Holy Grail (1982) though Dan Brown has stated that it was not used as research material.',
            imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/A15FFg6aNLL.jpg'
        }
    ]


    });
    const firas2 = new usersModel({

        email: 'dot.firashasan@gmail.com',
        bookies: [{

            name: 'who moved my cheese',
            description: 'An Amazing Way to Deal with Change in Your Work and in Your Life, published on September 8, 1998, is a motivational business fable. The text describes change in ones work and life, and four typical reactions to those changes by two mice and two Littlepeople, during their hunt for cheese',
            imgUrl: 'https://pbs.twimg.com/profile_images/2562538308/w1os1ywkdpxf4bvq8dnm.jpeg'
        },
        {
            name: 'one no one and one hundred thousand',
            description: 'Pirandellos classic 1925 novel Uno, Nessuno, Centomila (One, No One and One Hundred Thousand) recounts the tragedy of a man who struggles to reclaim a coherent identity for himself in the face of an inherently social and multi–faceted world.',
            imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71X9DBM0KTL.gif'
        }]
  });

firas.save();
firas2.save();
}
// bookCollectionSeed();
// userCollectionSeed();




app.get('/books',booksHandler);

function booksHandler(req, res) {
    let userEmail = req.query.email;

    usersModel.find({ email: userEmail }, function (err, userData) {
        if (err) {
            console.log(' that did not work');
        } else {
            console.log(userData);
            // console.log(userData[0]);
            console.log(userData[0].bookies);
            res.send(userData[0].bookies);
        }
    })
}

// function getbookHandler(req, res) {
//     let theName = req.query.name;
//     // let {name} = req.query
//     booksModel.find({ bookName: theName }, function (err, bookData) {
//         if (err) {
//             console.log('DOESNT WORK PROPERLY');
//         } else {
//             console.log(bookData)
//             console.log(bookData[0].bookies);
//             console.log(bookData[1].bookies);
//             console.log(bookData[2].bookies);

//         }
//     })
// }

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})