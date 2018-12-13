//function that gets data from Flickr API and appends the images to the website with pagination.
function searchFor(pageSet) {
    //get user search
    var yourInterest = document.getElementById('search').value;

    //if your search isn't empty, prepare to load photos on a blank background.
    if (yourInterest !== "") {
        document.body.style = "background-image:none;"
    }
    //hide searchbar on search
    var mySearch = document.getElementsByClassName('searchBar');
    mySearch[0].style = 'display:none;';

    //if your search isn't empty, run functions to get data to present photos.
    if (yourInterest !== "") {

        //get rid of old search results, return new
        var photoDiv = document.getElementById("imagesGoHere").innerHTML = "";

        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4cba17fae1e58d710af7c5efe9129b3&tags=" + yourInterest + "&safe_search=1&per_page=50"; //can set how many images you want to retrieve in per_page

        $.ajax({
            url: url + "&format=json&jsoncallback=?",
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (data.photos.photo.length !== 0) {
                    //Photos from flickr are received in data parts plugged into general url format https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

                    //-------using API to get Images--------------//
                    for (var i = pageSet; i < pageSet + 10; i++) {
                        //get the pieces for the image url.
                        var farm = data.photos.photo[i].farm;
                        var serverId = data.photos.photo[i].server;
                        var secret = data.photos.photo[i].secret;
                        var theID = data.photos.photo[i].id;

                        //put the pieces together into url.
                        var imgURL = "https://farm" + farm + ".staticflickr.com/" + serverId + "/" + theID + "_" + secret + ".jpg";

                        //get,create div, fill with url, style and append.

                        //get,create
                        var imagesGoHere = document.getElementById('imagesGoHere');
                        var photoDiv = document.createElement('div');
                        //style
                        photoDiv.className = "col-md-6 col-12 singlePhoto";
                        photoDiv.style = "border: 60px solid white; background-repeat: no-repeat; background-size: cover; height: 500px; padding:0px;";
                        photoDiv.style.backgroundImage = "url(" + imgURL + ")";
                        photoDiv.setAttribute('data-value', imgURL);

                        //append
                        imagesGoHere.appendChild(photoDiv);

                        //event listener to activate modal on click.
                        photoDiv.addEventListener('click', function (e) {
                            console.log(e.target.attributes["data-value"].value);
                            return showModal(e.target.attributes["data-value"].value)
                        })

                    } //end of for loop

                    //create pagination based on results list size
                    console.log(data.photos.photo.length);
                    var pages = Math.ceil(data.photos.photo.length / 10);
                    document.querySelector("#pagination").innerHTML = "";
                    for (var i = 1; i <= pages; i++) {
                        document.querySelector("#pagination").innerHTML += "<a onclick='searchFor(" + (i - 1) * 10 + ")'>" + i + "</a>"
                    };


                    //-----------Set up Pagination-- -- -- //
                    //reveal pagination on search
                    var pagination = document.getElementById('pagination');
                    pagination.className = "show";
                    //------------End Pagination---------//


                    //showmodal on click
                    var showModal = function showModal(theImage) {
                        document.body.style = "background-image:none;"
                        //create modal
                        //empty previous contents
                        var modal = document.getElementById('modal');
                        modal.innerHTML = "";
                        //style&fill modal
                        modal.className = "modalclass text-center";
                        var modalImg = document.createElement('div');
                        modalImg.innerHTML = "<img src=" + theImage + ">";
                        modalImg.className = "text-center";
                        modalImg.style = "background-color:rgba(10,5,0,0.9); box-shadow:10px 5px 20px black;"
                        modal.appendChild(modalImg);
                        modal.style = "display:block;";
                        modal.setAttribute('onclick', 'closefunc()');
                    }



                } else {
                    var noneFound = document.createElement('div');
                    noneFound.innerHTML = "<h1>No Images Found</h1>"
                    noneFound.className = "mx-auto m-5 p-3 text-light text-center";
                    noneFound.style = "border:1px solid black;"
                    document.getElementById('searchBar').appendChild(noneFound);
                }

            },
            type: "get",
        })
    } else {
        alert('You must enter a search criteria :)');
    }
}



//search on enter key
document.addEventListener('keypress',
    function (e) {
        if (13 == e.keyCode) {
            searchFor(0);
        }
    });


//click to close modal (anywhere)
function closefunc() {
    var modal = document.getElementById('modal');
    modal.style = "display:none";
}
