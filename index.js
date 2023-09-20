const Row = document.querySelector(".row")
const SearchValue = document.querySelector("input[type=search]")
const NextButton = document.querySelector(".next")
const pagenumber = document.querySelector(".page")
const footer = document.querySelector("footer")
let count = 1


function FirstFetch(object) {
    count = 1
    fetch(`https://api.pexels.com/v1/search?query=${object}`,
        { headers: { "Authorization": "u1kiVcfM9WSvZQN8GD3YuuuA1d7uhbqkc33lB3PkDJdFyI1LeE1X8a8d" } })
        .then(response => response.json())
        .then(body => {
            const photos = body.photos
            if (photos.length !== 0) {
                const ArrayCards = photos.map(photo => /*html*/
                `<div class="col-3 mb-4">
                     <div class="card">
                         <div class="button-save" >
                             <i class="bi bi-bookmark" onclick="saveCard()" ></i>
                         </div>
                         <img src="${photo.src.tiny}" class="card-img-top">
                         <div class="card-body">
                             
                             <h5 class="card-title">Photographer: ${photo.photographer}</h5>
                             <p class="card-text">${photo.alt}</p>
                         </div>
                     </div>
                 </div>`
                )
                Row.innerHTML = ArrayCards.join("")
                const Cards = document.querySelectorAll(".card")
                pagenumber.innerHTML = /*html*/
                 `Page: <span style="color: red;">${count}</span> | Quantity: <span style="color: red;">${Cards.length}</span>`
                footer.classList.remove("d-none")
                
            } else {
                footer.classList.add("d-none")
                Row.innerHTML = /*html*/
                    `<div class="col-12"><h4 class="text-center fw-bold">OOOPS! NON ABBIAMO TROVATO NIENTE, RIPROVA!</h4></div>`

            }
            
        })
}

function next() {
    count = count + 1
    fetch(`https://api.pexels.com/v1/search/?page=${count}&per_page=15&query=${SearchValue.value}`,
        { headers: { "Authorization": "u1kiVcfM9WSvZQN8GD3YuuuA1d7uhbqkc33lB3PkDJdFyI1LeE1X8a8d" } })
        .then(response => response.json())
        .then(body => {
            const photos = body.photos
            const ArrayCards = photos.map(photo => /*html*/
            `<div class="col-3 mb-4">
                <div class="card">
                    <div class="button-save" >
                        <i class="bi bi-bookmark" onclick="saveCard()" ></i>
                    </div>
                    <img src="${photo.src.tiny}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Photographer: ${photo.photographer}</h5>
                        <p class="card-text">${photo.alt}</p>
                    </div>
                </div>
            </div>`
            )
            Row.innerHTML += ArrayCards.join("")
            const Cards = document.querySelectorAll(".card")
            pagenumber.innerHTML = /*html*/
             `Page: <span style="color: red;">${count}</span> | Quantity: <span style="color: red;">${Cards.length}</span>`
            
            
        })

}

function search() {
    if (SearchValue.value) {
        FirstFetch(SearchValue.value)
    } else {
        Row.innerHTML = /*html*/
        `<div class="col-12"><h4 class="text-center fw-bold">Scrivi qualcosa e premi il tasto cerca</h4></div>`
    }
}

function saveCard() {
    const ClickSave = event.target
    if (count === 1) {
        count = 2
        ClickSave.className = "bi bi-bookmark-fill"
        console.log(count)
    } else if (count !== 1 ) {
        count = 1
        ClickSave.className = "bi bi-bookmark"
        console.log(count)
    }
    
}
