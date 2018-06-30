$('document').ready(function () {
    var socket = io('http://localhost:4000');
    // socket.emit('fetch-latest-posts');
    // socket.on('post-results-fetched', function (data) {
    //     console.log(data.data);
    // });

   
    // socket.emit('register-user', {
    //     "name": "comenting User",
    //     "type": "donor",
    //     "password": "123",
    //     "emailID": "asd1"+ Math.random()+"@gmail.com",
    //     "mobile": 123,
    //     "ID": 448979
    // });

    // socket.on('user-registered', function (data$('document').ready(function () {
    var socket = io('http://localhost:4000');
    // socket.emit('fetch-latest-posts');
    // socket.on('post-results-fetched', function (data) {
    //     console.log(data);
    // });

    socket.emit('filter-search', {
        title: 'update111',
        category: 'Apparel'
    });

    socket.on('post-results-fetched', function (data) {
        console.log(data);
    });


    // socket.emit('my-posts', "5b2e82eeaa974f81610b1a49");

    // socket.on('post-results-fetched', function (data) {
    //     console.log(data);
    // });

    // socket.emit('fetch-all-posts');

    // socket.on('post-results-fetched', function (data) {
    //     console.log(data);
    // });

    // socket.emit('register-user', {
    //     "name": "comenting User",
    //     "type": "donor",
    //     "password": "123",
    //     "emailID": "asd1" + Math.random() + "@gmail.com",
    //     "mobile": 123,
    //     "ID": 448979
    // });

    // socket.on('user-registered', function (data) {
    //     console.log(data);
    // });

    // socket.emit('login-attempt', {
    //     "password": "123",
    //     "emailID": "asd10.7195052889711164@gmail.com"
    // });

    // socket.on('login-attempt-response', function (data) {
    //     console.log(data);
    // });


    // socket.emit('create-post', {
    //     "description": "test",
    //     "quantityRequired": 123,
    //     "ageOfProduct": 123,
    //     "title": "test",
    //     "category": "Apparel",
    //     "isPostActive": true,
    //     "postedBy": '5b124c1c9d4d796e459cac17',
    //     "comments": [],
    //     "donationHistory": [],
    //     "quantityInHand": 0,
    //     "images": ['https://res-2.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/ywp34z6azibiq2kf55ix.png',
    //         'https://res-4.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/tpuctzkaontl9oul1rao.png',
    //         'https://cloudinary-res.cloudinary.com/image/upload/dpr_auto,q_auto/v1525107922/trivago.png']
    // });

    // socket.on('new-post-done', function (data) {
    //     console.log(data);
    // });

    // socket.emit('update-post', {
    //     "description": "test description update",
    //     "title": "test update title",
    //     "_id": "5b126ade2e7e38747e90357f"
    // });

    // socket.on('post-updated', function (data) {
    //     console.log(data);
    // })


    // socket.emit('create-comment', {
    //     description:'Comment - ' + Math.random(),
    //     postedBy: '5b124c1c9d4d796e459cac17',
    //     post: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('new-comment-added', function (data) {
    //     console.log(data);
    // })

    // socket.emit('delete-comment', {
    //     id:'5b12e7aa319985843642a1c9',
    //     postedBy: '5b124c1c9d4d796e459cac17',
    //     postID: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('comment-delete', function (data) {
    //     console.log(data);
    // })

    // socket.emit('create-donation', {
    //     quantityOffered: 2,
    //     // quantityOffered: Math.ceil(Math.random() * (123/10)),
    //     scheduledOn : new Date('06/'+ (Math.ceil(Math.random() * 20) + 4) +'/2018'),
    //     donationBy: '5b13acc5ce1c570f480a08b2',
    //     post: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('new-donation-added', function (data) {
    //     console.log(data);
    // })


    // socket.emit('create-comment', {
    //     description: "Some Comment" + Math.random(),
    //     postedBy: "5b110cbd34a06a3b333572d3",
    //     post: "5b110cbd34a06a3b333572d4"
    // });

    // socket.on('new-comment-added', function (data) {
    //     console.log(data);
    // })

    // socket.emit('delete-image-reference', "5b2e82eeaa974f81610b1a4a");

    // socket.on('image-reference-deleted', function (data) {
    //     console.log(data);
    // });

    // socket.emit('search-one-post', "5b2e82eeaa974f81610b1a49");

    // socket.on('post-in-detail', function (data) {
    //     console.log(data);
    // });

    // socket.emit('delete-post', "5b2f8884c163c991ce757d0b");

    // socket.on('post-deleted', function (data) {
    //     console.log(data);
    // });

});) {
    //     console.log(data);
    // });

    // socket.emit('login-attempt', {
    //     "password": "123",
    //     "emailID": "asd10.7195052889711164@gmail.com"
    // });

    // socket.on('login-attempt-response', function (data) {
    //     console.log(data);
    // });
    

    // socket.emit('create-post', {
    //     "description": "test",
    //     "quantityRequired": 123,
    //     "ageOfProduct": 123,
    //     "title": "test",
    //     "category": "Apparel",
    //     "isPostActive": true,
    //     "postedBy": '5b124c1c9d4d796e459cac17',
    //     "comments": [],
    //     "donationHistory": [],
    //     "quantityInHand": 0
    // });

    // socket.on('new-post-done', function (data) {
    //     console.log(data);
    // })

    // socket.emit('update-post', {
    //     "description": "test description update",
    //     "title": "test update title",
    //     "_id": "5b126ade2e7e38747e90357f"
    // });

    // socket.on('post-updated', function (data) {
    //     console.log(data);
    // })


    // socket.emit('create-comment', {
    //     description:'Comment - ' + Math.random(),
    //     postedBy: '5b124c1c9d4d796e459cac17',
    //     post: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('new-comment-added', function (data) {
    //     console.log(data);
    // })

    // socket.emit('delete-comment', {
    //     id:'5b12e7aa319985843642a1c9',
    //     postedBy: '5b124c1c9d4d796e459cac17',
    //     postID: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('comment-delete', function (data) {
    //     console.log(data);
    // })

    // socket.emit('create-donation', {
    //     quantityOffered: 2,
    //     // quantityOffered: Math.ceil(Math.random() * (123/10)),
    //     scheduledOn : new Date('06/'+ (Math.ceil(Math.random() * 20) + 4) +'/2018'),
    //     donationBy: '5b13acc5ce1c570f480a08b2',
    //     post: '5b126ade2e7e38747e90357f'
    // });

    // socket.on('new-donation-added', function (data) {
    //     console.log(data);
    // })

    
    // socket.emit('create-comment', {
    //     description: "Some Comment" + Math.random(),
    //     postedBy: "5b110cbd34a06a3b333572d3",
    //     post: "5b110cbd34a06a3b333572d4"
    // });

    // socket.on('new-comment-added', function (data) {
    //     console.log(data);
    // })

    socket.emit('search-one-post', "5b126ade2e7e38747e90357f");

    socket.on('post-in-detail', function (data) {
        console.log(data);
    });

});