var currentGameId;

function fetchGames() {
    let content = document.getElementById("content");

    let body = document.getElementsByTagName("body")[0];
    let p = document.createElement("p");
    body.appendChild(p);

    fetch('http://localhost:3000/games', {
        method: 'get'
    }).then(function(response) {
        response.json().then((data) => {
            if (data.length) {
                body.removeChild(p);
            }

            for (let i = 0; i < data.length; i++) {
                let image = document.createElement("img");
                image.setAttribute("src", data[i].img);
                image.width = 300;
                content.appendChild(image);

                let h2 = document.createElement("h2");
                h2.innerText = data[i].name;
                content.appendChild(h2);

                let dev = document.createElement("p")
                dev.innerText = data[i].developer;
                content.append("Developer:");
                content.appendChild(dev);

                let pub = document.createElement("p")
                pub.innerText = data[i].publisher;
                content.append("Publisher:");
                content.appendChild(pub);

                let editButton = document.createElement("button");
                let editText = document.createTextNode("Edit");
                editButton.appendChild(editText);
                editButton.addEventListener("click", function() {
                    window.scrollTo(0, 0);
                });
                editButton.onclick = function() {
                    document.getElementById("name").value = data[i].name;
                    document.getElementById("image").value = data[i].img;
                    document.getElementById("developer").value = data[i].developer;
                    document.getElementById("publisher").value = data[i].publisher;
                    currentGameId = data[i].id;
                }
                content.appendChild(editButton);

                let deleteButton = document.createElement("button");
                let deleteText = document.createTextNode("Delete");
                deleteButton.appendChild(deleteText);
                deleteButton.onclick = function() {
                    deleteGame(data[i].id);
                    document.addEventListener("DOMContentLoaded", function(event) {
                        var scrollpos = localStorage.getItem('scrollpos');
                        if (scrollpos) window.scrollTo(0, scrollpos);
                    });

                    window.onbeforeunload = function(e) {
                        localStorage.setItem('scrollpos', window.scrollY);
                    };
                }
                content.appendChild(deleteButton);


                let hr = document.createElement("hr");
                content.appendChild(hr);
            }
        })
    })
}

fetchGames()

function addGame() {
    var name = document.getElementById("name").value;
    var img = document.getElementById("image").value;
    var developer = document.getElementById("developer").value;
    var publisher = document.getElementById("publisher").value;

    var newGame = {
        name: name,
        img: img,
        developer: developer,
        publisher: publisher
    }
    fetch('http://localhost:3000/games', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
    }).then(function(response) {
        window.location.reload();;
    })
}

function editGame() {
    var name = document.getElementById("name").value;
    var img = document.getElementById("image").value;
    var developer = document.getElementById("developer").value;
    var publisher = document.getElementById("publisher").value;
    var newGame = {
        name: name,
        img: img,
        developer: developer,
        publisher: publisher
    }

    fetch('http://localhost:3000/games/' + currentGameId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
    }).then(function(response) {
        window.location.reload();
    })
}

function deleteGame(id) {
    fetch('http://localhost:3000/games/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        window.location.reload();
    })
}