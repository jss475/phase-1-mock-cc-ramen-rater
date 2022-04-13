// write your code here

//create global variable to access div with id of ramen-menu
let divRamenMenu = document.querySelector('#ramen-menu')
//create global variable to access form
let ramenForm = document.querySelector('#new-ramen')

//run functions created
loadFirst() //automatically loads first image when page is loaded
fetchImages() //loads the rest of the ramens onto the top of the page



//fetch images from the db.json
function fetchImages(){
    //fetch data from the server
    fetch('http://localhost:3000/ramens')
        .then(resp => resp.json())
        .then(data => displayImages(data)) //call displayImages to show images on the site
}

//create function to display images from db.json
function displayImages(data){
    //display all images in the div with id of ramen-menu
    data.forEach(ramen => {
        //create img tag
        const imgLine = document.createElement('img')
        //add src within img tag of image url
        imgLine.src = ramen.image
        //select image from each ramen and append to div
        divRamenMenu.append(imgLine)


        //create event listener for clicking on the image
        imgLine.addEventListener('click',e => {

            //create variable that accesses insert rating here
            let ratingLine = document.querySelector('#rating-display')
            ratingLine.textContent = ramen.rating //insert ramen rating

            //create variable that accesses comment line here
            let commentLine = document.querySelector('#comment-display')
            commentLine.textContent = ramen.comment //insert ramen comment

            //create variable that accesses image 
            let imageLine = document.querySelector('#ramen-detail img')
            imageLine.src = ramen.image //set ramen image
            
            //create variable that accesses 'insert name here' line
            let nameLine = document.querySelector('#ramen-detail h2')
            nameLine.textContent = ramen.name //set ramen name

            //create variable that accesses 'insert restaurant here' line
            let restaurantLine = document.querySelector('#ramen-detail h3')
            restaurantLine.textContent = ramen.restaurant

        })

        ////////////////WE ARE ADDING THE EDIT FORM BOX EVENT LISTENER HERE/////////////
        //access the edit block
        // let editBlock = document.querySelector('#edit-ramen')
        // //create a submit event listener on the edit form
        // editBlock.addEventListener('submit',e=>{
        //     let rating = e.target.rating.value
        //     let comment = e.target['new-comment'].value
    
        //     //create JSON object to PATCH the ramen 
        //     let objectConfiguration = {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         'body': JSON.stringify({
        //             "rating": rating,
        //             "comment": comment
        //         })
        //     }

        //     fetch(`'http://localhost:3000/ramens/'${ramen.ID}`,objectConfiguration)
        //         .then(resp => resp.json())
        //         .then(data => data)
        //         .catch(error => console.log(error.message))

        // })
    })
}

//create new ramen after submitting
ramenForm.addEventListener('submit',e => {
    e.preventDefault() //prevent refresh after submitting
    
    //get name value that was submitted
    let name = e.target.name.value
    //get resturant value that was submitted
    let restaurant = e.target.restaurant.value
    //get image value that was submitted
    let image = e.target.image.value
    //get rating value that was submitted
    let rating = e.target.rating.value
    //get comment value that was submitted
    let comment = e.target['new-comment'].value

    //create an image tag 
    let imageLine = document.createElement('img')
    imageLine.src = image   //insert image from form into image tag
    divRamenMenu.append(imageLine) //append div with ramen-menu id with new image
    
    //create a JSON object to add the data that was submitted to the server
    let objectConfiguration = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "name": name,
            "restaurant": restaurant,
            "image": image,
            "rating": rating,
            "comment": comment
        })
    }
    
    //create an Eventlistener for clicking on the image added
    imageLine.addEventListener('click',e => {

        //create variable that accesses insert rating here
        let ratingLine = document.querySelector('#rating-display')
        ratingLine.textContent = rating //insert ramen rating

        //create variable that accesses comment line here
        let commentLine = document.querySelector('#comment-display')
        commentLine.textContent = comment //insert ramen comment

        //create variable that accesses image 
        let imageLine = document.querySelector('#ramen-detail img')
        imageLine.src = image //set ramen image
        
        //create variable that accesses 'insert name here' line
        let nameLine = document.querySelector('#ramen-detail h2')
        nameLine.textContent = name //set ramen name

        //create variable that accesses 'insert restaurant here' line
        let restaurantLine = document.querySelector('#ramen-detail h3')
        restaurantLine.textContent = restaurant

    })


    //fetch the server and POST to the server with the new ramen information
    fetch('http://localhost:3000/ramens',objectConfiguration)
        .then(resp => resp.json())
        .then(data => data)
        .catch(error => console.log(error.message))

    ramenForm.reset()

    
})


//function to load details of first ramen when page loads
function loadFirst(){
    let jsondata
    //fetch the info for just the first ramen
    fetch('http://localhost:3000/ramens/1')
        .then(resp => resp.json())
        .then(data => {
            //create variable that accesses insert rating here
            let ratingLine = document.querySelector('#rating-display')
            ratingLine.textContent = data.rating //insert ramen rating

            //create variable that accesses comment line here
            let commentLine = document.querySelector('#comment-display')
            commentLine.textContent = data.comment //insert ramen comment

         //create variable that accesses image 
            let imageLine = document.querySelector('#ramen-detail img')
            imageLine.src = data.image //set ramen image
    
            //create variable that accesses 'insert name here' line
            let nameLine = document.querySelector('#ramen-detail h2')
            nameLine.textContent = data.name //set ramen name

            //create variable that accesses 'insert restaurant here' line
            let restaurantLine = document.querySelector('#ramen-detail h3')
            restaurantLine.textContent = data.restaurant
        })
    
}

//edit the rating and comment of ramen by submitting a form

