//Global to check for Yugioh or Pokemon search. Defaulted to true for pokemon search. Change to false for Yuigoh search
let isPokemon = true 
let userInput = "charizard"
$(document).ready(function () {
  $('.sidenav').sidenav();
});


const displayPokemonCards = userInput =>{
  $.get(`https://api.pokemontcg.io/v1/cards?name=${userInput}`)
    .then( ({cards}) =>{
      console.log(cards)
      let selector = $('#cardDisplay')
      for(let i =0; i<cards.length; i++){
        let newCards = $('<p>')
        newCards.attr('id', cards[i].id)
        newCards.html(`
          <img scr = "${cards[i].imageUrlHiRes}">
        `)
        selector.append(newCards)
      }
    })
    .catch(error => console.error(error))
}

displayPokemonCards(userInput)