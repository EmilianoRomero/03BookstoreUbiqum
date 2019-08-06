//FILE: bookstore.js linked to bookstore.html

//ACCESSING JSON ON LINE.
accessingTheOnLineJSON()

function accessingTheOnLineJSON() {
    let url = "https://api.myjson.com/bins/zyv02"
    fetchingDataFromOnLineJSON(url)
}

//FETCHING IT! GETTING THE INFO FROM JSON ON LINE SERVER
function fetchingDataFromOnLineJSON(url) {
    fetch(url, {
            method: "GET",
        })

        .then(response => {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            //1.Checking the accessibility to the array            
            //1-a.Checking the information from the object
            console.log("Console data" + " ", data)
            console.log("Console data.books" + " ", data.books)

            //1-b.Defining my object to work with
            let books = data.books
            console.log("data.books = books" + " ", books);

            //1-c.Getting the keys for the element [0]
            Object.keys(books[0]).forEach(item => {
                console.log("Console object's keys" + " ", item);
            });

            //1-d.Accessing the book covers as links
            function getBookCoverLinkAndImage() {
                var i
                let booksL = books.length
                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    console.log(coverImg)
                    let cover = document.createElement("IMG")
                    cover.src = coverImg
                    bookshelf.appendChild(cover)
                }
            }
            getBookCoverLinkAndImage(books)

            function getTitlesAndDescrptionsLinkAndContent() {
                var i
                let booksL = books.length
                let titles = []
                let descriptions = []
                
                let booksFrontAndBack = []

                for (i = 0; i < booksL; i++) {

                    let bookFrontAndBack = {}
                    let title = books[i].title;
                    titles.push(title)
                    
                    let description = books[i].description;
                    descriptions.push(description)
                    
                    bookFrontAndBack.title = books[i].title;
                    
                    bookFrontAndBack.description = books[i].description;

                    booksFrontAndBack.push(bookFrontAndBack)
                    //let backInfo = document.createElement("IMG")
                    //backInfo.src = (title, description)
                    //bookshelfback.appendChild(title, description)
                }
                console.log(titles)
                console.log(descriptions)
                console.log(booksFrontAndBack)
            }
            getTitlesAndDescrptionsLinkAndContent(books)
        })

        .catch(function (error) {
            console.log(error);
        });
}