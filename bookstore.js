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

            function fillTheBookshelf() {
                var i
                var booksL = books.length

                //THE BOOKSHELF
                let theBookshelf = document.getElementById("theBookshelf");

                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    console.log(coverImg);

                    //THE BOOKCONTAINER
                    let theBookContainer = document.createElement("DIV");
                    theBookContainer.className = "theBookContainer";
                    theBookContainer.id = "theBookContainer";    

                    //THE BOOK
                    let theBook = document.createElement("DIV");
                    theBook.className = "theBook";
                    theBook.id = "everySingleBook"

                    //THE FRONT
                    let theFront = document.createElement("DIV");
                    theFront.className = "theFront";
                    theFront.id = "everySingleFront";

                    //THE BACK
                    let titles = []
                    let descriptions = []
                    let booksBackCovers = []
                    let theBack = document.createElement("DIV");
                    theBack.className = "theBack";
                    theBack.id = "everySingleBack";

                    //COVERS'S CONTENT
                    let booksCover = document.createElement("IMG");
                    booksCover.className = "front";
                    booksCover.id = "cover"
                    booksCover.src = coverImg;
                    theFront.appendChild(booksCover);
                    theBook.appendChild(theFront);

                    //BACKCOVERS'S CONTENT
                    let bookTitlesAndDescriptions = {}

                    let title = books[i].title;
                    titles.push(title);

                    let description = books[i].description;
                    descriptions.push(description);

                    bookTitlesAndDescriptions.title = books[i].title;

                    bookTitlesAndDescriptions.description = books[i].description;

                    booksBackCovers.push(bookTitlesAndDescriptions);

                    //TITLE
                    let backCoverTitle = document.createElement("H2");
                    backCoverTitle.className = "back";
                    backCoverTitle.id = "title";
                    backCoverTitle.innerHTML = bookTitlesAndDescriptions.title;
                    theBack.appendChild(backCoverTitle);

                    //DESCRIPTION
                    let backCoverDescription = document.createElement("P");
                    backCoverDescription.className = "back";
                    backCoverDescription.id = "description";
                    backCoverDescription.innerHTML = bookTitlesAndDescriptions.description;
                    theBack.appendChild(backCoverDescription);

                    theBook.appendChild(theBack);

                    //COVER (FRONT) AND BACKCOVER (BACK)
                    theBookContainer.appendChild(theBook);
                    theBookshelf.appendChild(theBookContainer);

                    //BUTTON MORE INFO
                    let moreInfo = document.createElement("DIV");
                    moreInfo.id = "moreInfo";
                    let buttonMoreInfo = document.createElement("BUTTON");
                    buttonMoreInfo.className = "buttonMoreInfo";
                    buttonMoreInfo.id = "buttonMoreInfo";
                    buttonMoreInfo.innerHTML = "+ info";
                    moreInfo.appendChild(buttonMoreInfo);
                    theBack.appendChild(moreInfo);

                    //MODAL CONTENT FROM API WITH MORE INFO
                    let booksMoreInfo = books[i].detail;
                    
                    //MODAL
                    let theModal = document.createElement("DIV");
                    theModal.className = "theModal";
                    theModal.id = "theModal";
                    theBookshelf.appendChild(theModal);

                    //CREATE ELEMENT MODAL IMAGE
                    let imgModal = document.createElement("IMG");
                    imgModal.className = "imgModal";
                    imgModal.src = booksMoreInfo;
                    theModal.appendChild(imgModal);

                    //BUTTON CLOSE MORE INFO
                    let closeModal = document.createElement("BUTTON");
                    closeModal.className = "closeModal";
                    closeModal.id = "closeModal";
                    closeModal.innerHTML = "close";
                    theModal.appendChild(closeModal);

                    //FUNCTION DISPLAY - CLOSE MODAL
                    buttonMoreInfo.onclick = function () {
                        theModal.style.display = "flex";
                    }

                    closeModal.onclick = function () {
                        theModal.style.display = "none";
                    }
                }
            }
            fillTheBookshelf(books)


            function createSearchInput() {
                let searchInputDiv = document.createElement("DIV");
                searchInputDiv.className = "searchInputDiv";

                let searchBox = document.createElement("INPUT");
                searchBox.id = "searchBox";
                searchBox.name = "searchBox";

                searchBox.setAttribute("type", "search");

                searchInputDiv.appendChild(searchBox);
                banner.appendChild(searchInputDiv);

                let submitDiv = document.createElement("DIV");
                submitDiv.className = "submitDiv";

                let submitBtn = document.createElement("INPUT");
                submitBtn.id = "submitMySearch";
            }

            createSearchInput();
        })

        .catch(function (error) {
            console.log(error);
        });
}