//function that gets data from Flickr API and appends the images to the website with pagination.
function searchFor(pageSet) {

    var yourInterest = document.getElementById('search').value;
    console.log(yourInterest);
    if (yourInterest !== "") {
        document.body.style = "background-image:none;";
    }

    if (yourInterest !== "") {

        var photoDiv = document.getElementById("imagesGoHere").innerHTML = "";

        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4cba17fae1e58d710af7c5efe9129b3&tags=" + yourInterest + "&safe_search=1&per_page=50";

        $.ajax({
            url: url + "&format=json&jsoncallback=?",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.photos.photo.length !== 0) {
                    //instruction for url format for flickr is: //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

                    //-------using API to get Images--------------//
                    for (i = pageSet; i < pageSet + 10; i++) {
                        //get the pieces for the image url.
                        var farm = data.photos.photo[i].farm;
                        var serverId = data.photos.photo[i].server;
                        var secret = data.photos.photo[i].secret;
                        var theID = data.photos.photo[i].id;

                        //put the pieces together into url.
                        var imgURL = "https://farm" + farm + ".staticflickr.com/" + serverId + "/" + theID + "_" + secret + ".jpg";
                        console.log(imgURL);

                        //get,create div, fill with url, style and append.

                        //get,create
                        var imagesGoHere = document.getElementById('imagesGoHere');
                        var photoDiv = document.createElement('div');
                        //style
                        photoDiv.className = "col-md-6 col-12 singlePhoto";
                        photoDiv.style = "border: 30px solid white; background-repeat: no-repeat; background-size: cover; height: 500px;padding:0px;";
                        photoDiv.style.backgroundImage = "url(" + imgURL + ")";
                        photoDiv.setAttribute('data-value', imgURL);

                        //apend
                        imagesGoHere.appendChild(photoDiv);

                        photoDiv.addEventListener('click', function (e) {
                            return showModal(e.target.attributes["data-value"].value)
                        })

                    }

                    //-----------Set up Pagination------//
                    //reveal pagination on search
                    var pagination = document.getElementById('pagination');
                    pagination.className = "show";
                    //------------End Pagination---------//


                    //--modal click event listener--//
                    var showModal = function showModal(theImage) {
                        document.body.style = "background-image:none;"
                        //create modal
                        //empty previous contents
                        var modal = document.getElementById('modal');
                        modal.innerHTML = "";
                        //style&fill modal
                        modal.style = "display:block";
                        modal.setAttribute('onclick', 'closefunc()');
                        modal.innerHTML = "<img src=" + theImage + ">";
                        modal.firstElementChild.style = "display:block;margin-left:auto;margin-right:auto;width:auto; height:100%;";
                    }


                }
            },
            type: "get",
        })
    } else {
        alert('please enter search criteria');
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
