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
            /*headers: {
                "X-API-Key": "ZnV9hZHe5Q6tOdwr8zo6XrMJfTcCGLLqxSe1VzhO"
            }*/
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            
            //Checking the information from the object
            console.log("Console data" + " ", data)
            console.log("Console data.books" + " ", data.books)
            
            //Defining my object to work with
            let books = data.books
            console.log("data.books = books" + " ", books);
            
            //Getting the keys for the element [0]
            Object.keys(books[0]).forEach(item => {
                console.log("console keys" + " ", item);
            });

            
            








            /*console.log(data.results[0].members);
            let members = data.results[0].members;
            let statistics = dataStat.statistics;

            mapMembersParty(members);
            mapMembersVotes(members);

            buildTable(statistics);
            
            if (document.title.includes("Loyalty")){
                sortAscending(members, "votes_with_party_pct");
                feedsLeastTable(members);

                sortDescending(members, "votes_with_party_pct");
                feedsMostTable(members);
            }else{
                sortAscending(members, "missed_votes_pct");
                feedsHighestAttendanceTable(members);

                sortDescending(members, "missed_votes_pct");
                feedsLowestAttendanceTable(members);
            }*/
        })

        .catch(function (error) {
            console.log(error);
        });
}