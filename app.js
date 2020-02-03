//Global to check for Yugioh or Pokemon search. Defaulted to true for pokemon search. Change to false for Yuigoh search
let isPokemon = true
let userInput = "charizard"

$(document).ready(function () {
  $('select').formSelect();
});

$(document).ready(function () {
  $('.sidenav').sidenav();
});

$('#card_search').on('click', (e) => {
  e.preventDefault()
  let name = $('#card_name').val()
  if ($('#card_select').val() === '1') { isPokemon = true } else { isPokemon = false }
  console.log(userInput, isPokemon)

  if (isPokemon === true) {
    console.log('pokemon')
    displayPokemonCards(name)
  } else {
    console.log('yugioh')
  }
})


const displayPokemonCards = userInput => {
  $('#card_list').html('')

  $.get(`https://api.pokemontcg.io/v1/cards?name=${userInput}`)
    .then(({ cards }) => {
      console.log(cards)
      let selector = $('#card_list')
      for (let i = 0; i < cards.length; i++) {
        let newCards = $('<div>')
        newCards.attr('id', cards[i].id)
        newCards.addClass("col s12 m4")
        newCards.html(`
        <div class="card">
          <div class="card-image">
            <img height=400 src="${cards[i].imageUrl}">
          </div>
          <div class="card-action">
            <a href="#">Add to deck</a>
          </div>
        </div>
      </div>
        `)
        selector.append(newCards)
      }
    })
    .catch(error => console.error(error))
}

displayPokemonCards(userInput)
