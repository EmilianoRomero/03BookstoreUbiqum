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
                let frontContent = document.getElementById("cover");

                for (i = 0; i < booksL; i++) {
                    let coverImg = books[i].cover;
                    console.log(coverImg);

                    let booksFront = document.createElement("DIV");
                    booksFront.className = "everySingleFront";

                    let booksCover = document.createElement("IMG");
                    booksCover.className = "classFrontContent";
                    booksCover.src = coverImg;
                    booksFront.appendChild(booksCover);

                    frontContent.appendChild(booksFront);
                }
            }
            getBookCoverLinkAndImage(books)


            function getTitlesAndDescrptionsLinkAndContent() {
                var i
                var booksL = books.length
                let titles = []
                let descriptions = []
                let booksBackCovers = []
                let backContent = document.getElementById("backcover");

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

                    let backCoverTitle = document.createElement("H1");
                    backCoverTitle.className = "classBackContent";
                    backCoverTitle.id = "title";
                    backCoverTitle.innerHTML = bookTitlesAndDescriptions.title;
                    backCoverDiv.appendChild(backCoverTitle);

                    let backCoverDescription = document.createElement("P");
                    backCoverDescription.className = "classBackContent";
                    backCoverDescription.id = "description";
                    backCoverDescription.innerHTML = bookTitlesAndDescriptions.description;                    
                    backCoverDiv.appendChild(backCoverDescription);
                    
                    let buttonDiv = document.createElement("DIV");
                    buttonDiv.id = "buttonDivId";
                    let btn = document.createElement("BUTTON");
                    btn.className = "bt btn-default btn-sm";
                    btn.id = "moreInfo";
                    btn.innerHTML = "+ INFO";
                    buttonDiv.appendChild(btn);
                    backCoverDiv.appendChild(buttonDiv);

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

            /* FUNCTIONS FOR THE INPUT SEARCH BOX */
            function autocomplete(inp, arr) {
                /*the autocomplete function takes two arguments,
                the text field element and an array of possible autocompleted values:*/
                var currentFocus;
                /*execute a function when someone writes in the text field:*/
                inp.addEventListener("input", function(e) {
                    var a, b, i, val = this.value;
                    /*close any already open lists of autocompleted values*/
                    closeAllLists();
                    if (!val) { return false;}
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    /*for each item in the array...*/
                    for (i = 0; i < arr.length; i++) {
                      /*check if the item starts with the same letters as the text field value:*/
                      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                      }
                    }
                });
                /*execute a function presses a key on the keyboard:*/
                inp.addEventListener("keydown", function(e) {
                    var x = document.getElementById(this.id + "autocomplete-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                      /*If the arrow DOWN key is pressed,
                      increase the currentFocus variable:*/
                      currentFocus++;
                      /*and and make the current item more visible:*/
                      addActive(x);
                    } else if (e.keyCode == 38) { //up
                      /*If the arrow UP key is pressed,
                      decrease the currentFocus variable:*/
                      currentFocus--;
                      /*and and make the current item more visible:*/
                      addActive(x);
                    } else if (e.keyCode == 13) {
                      /*If the ENTER key is pressed, prevent the form from being submitted,*/
                      e.preventDefault();
                      if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                      }
                    }
                });
                function addActive(x) {
                  /*a function to classify an item as "active":*/
                  if (!x) return false;
                  /*start by removing the "active" class on all items:*/
                  removeActive(x);
                  if (currentFocus >= x.length) currentFocus = 0;
                  if (currentFocus < 0) currentFocus = (x.length - 1);
                  /*add class "autocomplete-active":*/
                  x[currentFocus].classList.add("autocomplete-active");
                }
                function removeActive(x) {
                  /*a function to remove the "active" class from all autocomplete items:*/
                  for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                  }
                }
                function closeAllLists(elmnt) {
                  /*close all autocomplete lists in the document,
                  except the one passed as an argument:*/
                  var x = document.getElementsByClassName("autocomplete-items");
                  for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                      x[i].parentNode.removeChild(x[i]);
                    }
                  }
                }
                /*execute a function when someone clicks in the document:*/
                document.addEventListener("click", function (e) {
                    closeAllLists(e.target);
                });
              }


        })

        .catch(function (error) {
            console.log(error);
        });
}