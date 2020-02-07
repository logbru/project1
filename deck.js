// 
let isPokemon = true

$(document).ready(function () {
  $('select').formSelect();
});

$(document).ready(function () {
  $('.sidenav').sidenav();
});

const renderPokedeck = (e) => {
  $('#card_list').html('')
  let deckArr = JSON.parse(localStorage.getItem('pokeDeck'))
  deckArr.forEach(cardinfo => {
    let card = $('<div>')
    card.attr('id', deckArr.indexOf(cardinfo))
    card.addClass("col s12 m4")
    card.html(`
        <div class="card">
          <div class="card-image">
            <img height=400 src="${cardinfo[1]}">
          </div>
          <div class="card-action">
            <a id="remove" class="waves-effect waves-light btn-small addDeck">Remove</a>
          </div>
        </div>
        `)
    $('#card_list').append(card)
  })
}

const renderYugideck = (e) => {
  $('#card_list').html('')
  let deckArr = JSON.parse(localStorage.getItem('yugiDeck'))
  deckArr.forEach(cardinfo => {
    let card = $('<div>')
    card.attr('id', deckArr.indexOf(cardinfo))
    card.addClass("col s12 m4")
    card.html(`
        <div class="card">
          <div class="card-image">
            <img height=400 src="${cardinfo[1]}">
          </div>
          <div class="card-action">
            <a id="remove" class="waves-effect waves-light btn-small addDeck">Remove</a>
          </div>
        </div>
        `)
    $('#card_list').append(card)
  })
}

$('#openDeck').on('click', (e) => {
  if ($('#deck_select').val() === '1') { isPokemon = true } else { isPokemon = false }

  switch (isPokemon) {
    case true:
      renderPokedeck()
      break

    case false:
      renderYugideck()
      break
  }
})

const removeCard = (card_id) => {
  // Creates notification user when card gets removed from the deck
  M.toast({ html: 'Card removed from the deck' })
  switch (isPokemon) {
    case true:
      let pokeArr = JSON.parse(localStorage.getItem('pokeDeck'))
      pokeArr.splice(card_id, 1)
      localStorage.setItem('pokeDeck', JSON.stringify(pokeArr))
      renderPokedeck()
      break

    case false:
      let yugiArr = JSON.parse(localStorage.getItem('yugiDeck'))
      yugiArr.splice(card_id, 1)
      localStorage.setItem('yugiDeck', JSON.stringify(yugiArr))
      renderYugideck()
      break
  }
}


$(document).on('click', (e) => {
  if (e.target.id === 'remove') {
    let card_id = e.target.parentElement.parentElement.parentElement.id
    removeCard(card_id)
  }
})