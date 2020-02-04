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
  deckArr.forEach(card => {
    $.get(`https://api.pokemontcg.io/v1/cards?id=${card}`)
      .then(({ cards }) => {
        console.log(cards)
        let selector = $('#card_list')
        let cardsAmount = cards.length++
        console.log(cardsAmount)
        $('#total').text(`Total Cards Found: ${cardsAmount}`)
        for (let i = 0; i < cards.length; i++) {
          let newCards = $('<div>')
          newCards.attr('id', cards[i].id)
          newCards.addClass("col s12 m4")
          newCards.html(`
        <div class="card">
          <div class="card-image">
            <img height=400 src="${cards[i].imageUrlHiRes}">
          </div>
          <div class="card-action">
            <a id="remove" class="waves-effect waves-light btn-small addDeck">Remove</a>
          </div>
        </div>
        `)
          $('#card_list').append(newCards)
        }
      })
      .catch(error => console.error(error))
  })
}

const renderYugideck = (e) => {
  $('#card_list').html('')
  let deckArr = JSON.parse(localStorage.getItem('yugiDeck'))
  deckArr.forEach(card => {
    $.get(`https://db.ygoprodeck.com/api/v6/cardinfo.php?name=${card}`)
      .then(cards => {
        $('#total').text(`Total Cards Found: ${cards.length}`)
        console.log(cards)
        let cardImage = cards[0].card_images[0].image_url
        let card = $('<div>')
        card.attr('id', cards[0].name)
        card.addClass("col s12 m4")
        card.html(`
        <div class="card">
          <div class="card-image">
            <img height=400 src="${cardImage}">
          </div>
          <div class="card-action">
<a id="remove" class="waves-effect waves-light btn-small addDeck">Remove</a>
          </div>
        </div>
        `)
        $('#card_list').append(card)

      })
      .catch(error => console.error(error))
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
      pokeArr.splice(pokeArr.indexOf(card_id), 1)
      localStorage.setItem('pokeDeck', JSON.stringify(pokeArr))
      renderPokedeck()
      break

    case false:
      let yugiArr = JSON.parse(localStorage.getItem('yugiDeck'))
      yugiArr.splice(yugiArr.indexOf(card_id), 1)
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