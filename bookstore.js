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

            //2-a.Getting book covers's links and their appended img; creating image in html, embeding img from src

            function getBookCoverLinkAndImage() {
                var i
                var booksL = books.length
                let frontContent = document.getElementById("bookshelf");

                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    console.log(coverImg)

                    let coverDiv = document.createElement("DIV")
                    coverDiv.className = "everySingleBook"

                    let cover = document.createElement("IMG")
                    cover.src = coverImg
                    coverDiv.appendChild(cover)

                    frontContent.appendChild(coverDiv)
                }
            }
            getBookCoverLinkAndImage(books)


            function getTitlesAndDescrptionsLinkAndContent() {
                var i
                var booksL = books.length
                let titles = []
                let descriptions = []
                let booksBackCovers = []
                let backContent = document.getElementById("bookshelfback");

                for (i = 0; i < booksL; i++) {

                    let bookTitlesAndDescriptions = {}
                    let title = books[i].title;
                    titles.push(title);

                    let description = books[i].description;
                    descriptions.push(description);

                    bookTitlesAndDescriptions.title = books[i].title;

                    bookTitlesAndDescriptions.description = books[i].description;

                    booksBackCovers.push(bookTitlesAndDescriptions);

                    let backCoverDiv = document.createElement("DIV");
                    backCoverDiv.className = "everySingleBack";

                    let backCover = document.createElement("P");
                    backCover.innerHTML = bookTitlesAndDescriptions.title + "." + " " + bookTitlesAndDescriptions.description;
                    backCoverDiv.appendChild(backCover);

                    let btn = document.createElement("BUTTON");
                    btn.className = "btn btn-info";
                    btn.innerHTML = "MORE INFO";
                    backCoverDiv.appendChild(btn);

                    backContent.appendChild(backCoverDiv)
                }
                console.log(titles)
                console.log(descriptions)
                console.log(booksBackCovers)
            }
            getTitlesAndDescrptionsLinkAndContent(books)

            function createSearchInput() {
                let searchInput = document.getElementById("searchinput");
                let searchBox = document.createElement("INPUT");
                searchBox.setAttribute("type", "search");
                searchInput.appendChild(searchBox);
            }
            createSearchInput();

        })

        .catch(function (error) {
            console.log(error);
        });
}