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

            //2.Creating table dynamically

            function getCoverImageFromLink(books) {
                let booksL = books.length
                var i
                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    return coverImg;
                }
                console.log(coverImg)
            }

            var img = document.createElement("IMG");
            img.src = getCoverImageFromLink(books);
            bookshelf.appendChild(img);

            function buildBookshelf(books, bookshelf) {
                var tbody = document.getElementById(bookshelf)
                let booksL = books.length
                var i
                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    var row = document.createElement("TR")

                    var td = document.createElement("TD")
                    td.innerHTML = getCoverImageFromLink(books)
                    row.appendChild(td)

                    tbody.appendChild(row)
                }
            }
            buildBookshelf(books, bookshelf);

            //2.Assigning content to the grid
            //2-a.Bookcovers
            /*
                        function insertBookcoverImg (id) {
                            let coverImg = document.getElementById("book id").innerHTML
                            coverImg.src = books[0].cover
                            book.appendChild(coverImg);
                            insertBookcoverImg (r1c1);
                        }
                            console.log(coverImg)
            */
        })

        .catch(function (error) {
            console.log(error);
        });
}