const Row = document.querySelector(".row")
const SearchValue = document.querySelector("input[type=text]")


function FetchTotale(object) {
    
    
    fetch(`https://api.pexels.com/v1/search?query=${object}`,
    {headers: {"Authorization": "u1kiVcfM9WSvZQN8GD3YuuuA1d7uhbqkc33lB3PkDJdFyI1LeE1X8a8d"}})
    
    .then(response => response.json())
    .then(body => {
        const photos = body.photos
        const ArrayCards = photos.map(photo => 
        /*html*/ `<div class="col-3 mb-4">
                        <div class="card"><img src="${photo.src.portrait}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Photographer: ${photo.photographer}</h5>
                                <p class="card-text">${photo.alt}</p>
                            </div>
                        </div>
                </div>`
        )       
        console.log(ArrayCards.join(""))

        Row.innerHTML = ArrayCards.join("")
    })
}

function search() {
    
    FetchTotale(SearchValue.value)
}


console.log("ciao")
    
    