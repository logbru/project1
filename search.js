// 
//Global to check for Yugioh or Pokemon search. Defaulted to true for pokemon search. Change to false for Yuigoh search
let isPokemon = true
let userInput = "charizard"

if (localStorage.hasOwnProperty('pokeDeck') === true) {

} else {
  let pokeDeck = []
  localStorage.setItem('pokeDeck', JSON.stringify(pokeDeck))
}

if (localStorage.hasOwnProperty('yugiDeck') === true) {

} else {
  let yugiDeck = []
  localStorage.setItem('yugiDeck', JSON.stringify(yugiDeck))
}

$(document).ready(function () {
  $('select').formSelect();
});

$(document).ready(function () {
  $('.sidenav').sidenav();
});

$(document).ready(function () {
  $('.modal').modal();
});

//checks if user selects Pokemon/Yugioh
$('#card_select').change(_ => {
  isPokemon = !isPokemon
})


$('#card_search').on('click', (e) => {
  e.preventDefault()
  let name = $('#card_name').val()
  // if ($('#card_select').val() === '1') { isPokemon = true } else { isPokemon = false }
  // console.log(userInput, isPokemon)
  $('#card_name').val('')
  if (isPokemon === true) {
    renderPokemon(name)
  } else {
    if ($('#set_search_box').is(':checked')) {
      renderYugiohSet(name)
    } else {
      renderYugioh(name)
    }
  }
})


const renderPokemon = userInput => {
  $('#card_list').html('')
  $('#total').html('')
  $.get(`https://api.pokemontcg.io/v1/cards?name=${userInput}`)
    .then(({ cards }) => {
      let selector = $('#card_list')
      let cardsAmount = cards.length++
      //error checking for userInput
      if (cardsAmount > 1) {
        $('#total').text(`Total Cards Found: ${cardsAmount}`)
      }
      else {
        $('#card_list').html(`<h5> Invalid Input. Please try again. </h5>`)
        return
      }
      $('#total').text(`Total Cards Found: ${cardsAmount}`)
      for (let i = 0; i < cards.length - 1; i++) {
        let newCards = $('<div>')
        newCards.attr('id', cards[i].id)
        newCards.addClass("col s12 m4")
        newCards.html(`
        <div class="card" cardimg="${cards[i].imageUrlHiRes}" cardname="${cards[i].name}">
          <div class="card-image">
            <img height=400 src="${cards[i].imageUrlHiRes}">
          </div>
          <div class="card-action">
            <a id="addDeck" class="waves-effect waves-light btn-small addDeck">Add to Deck</a>
            <a id="moreInfo" class="waves-effect waves-light btn-small modal-trigger" href="#poke_modal">More Info</a>
          </div>
        </div>
        `)
        selector.append(newCards)
      }
    })
    .catch(error => console.error(error))
}

const renderYugioh = userInput => {
  $('#card_list').html('')
  $('#total').html('')
  $.get(`https://db.ygoprodeck.com/api/v6/cardinfo.php?name=${userInput}`)
    .then(cards => {
      $('#total').text(`Total Cards Found: ${cards.length}`)
      let cardImage = cards[0].card_images[0].image_url
      let card = $('<div>')
      card.attr('id', cards[0].name)
      card.attr('cardimg', cardImage)
      card.attr('cardname', cards[0].name)
      card.addClass("col s12 m4")
      card.html(`
        <div class="card" cardimg="${cardImage}" cardname="${cards[0].name}">
          <div class="card-image">
            <img src="${cardImage}" alt = "${cards[0].name}">
          </div>
          <div class="card-action">
            <a id="addDeck" class="waves-effect waves-light btn-small addDeck">Add to Deck</a>
            <a id="moreInfo" class="waves-effect waves-light btn modal-trigger" href="#yugi_modal">More Info</a>
            <a id="yugi-alt-image" class="waves-effect waves-light btn modal-trigger" href="#yugi-alt-modal">Alt Card Art</a>
          </div>
        </div>
        `)
      $('#card_list').append(card)
    })
    .catch(error => {
      console.error(error)
      $('#card_list').html(`<h5> Invalid Input. Please try again. </h5>`)
    })
}

    const renderaltYugioh = userInput => {
      let altSelector =$('#yugi-alt-modal-content')
      altSelector.empty()
      $.get(`https://db.ygoprodeck.com/api/v6/cardinfo.php?name=${userInput}`)
        .then(cards => {
          if (cards[0].card_images.length <= 1){ 
            altSelector.html('<h3>There are no alternative card images</h3>')
          }
          else  { 
          for (let i=1; i < cards[0].card_images.length; i++){
          let card = $('<div>')
          card.html(`
            <div class="card">
              <div class="card-image">
                <img height=auto width= 100 src ="${cards[0].card_images[i].image_url}" alt = "${cards[0].name}">
              </div>         
            `)
          altSelector.append(card) 
          }
        }
        })
        .catch(error => console.error(error))
      }
    


const renderYugiohSet = userInput => {
  $('#card_list').html('')
  $('#total').html('')
  $.get(`https://db.ygoprodeck.com/api/v6/cardinfo.php?set=${userInput}`)
    .then(cards => {
      $('#total').text(`Total Cards Found: ${cards.length}`)
      for (let i = 0; i < cards.length - 1; i++) {
        let cardImage = cards[i].card_images[0].image_url
        let card = $('<div>')
        card.attr('id', cards[i].name)
        card.attr('cardimg', cardImage)
        card.attr('cardname', cards[i].name)
        card.addClass("col s12 m4")
        card.html(`
        <div class="card" cardimg="${cardImage}" cardname="${cards[i].name}">
          <div class="card-image">
            <img height=478.44 src="${cardImage}" alt = "${cards[i].name}">
          </div>
          <div class="card-action">
            <a id="addDeck" class="waves-effect waves-light btn-small addDeck">Add to Deck</a>
            <a id="moreInfo" class="waves-effect waves-light btn-small modal-trigger" href="#yugi_modal">More Info</a>
            <a id="yugi-alt-image" class="waves-effect waves-light btn modal-trigger" href="#yugi-alt-modal">Alt Card Art</a>
          </div>
        </div>
        `)
        $('#card_list').append(card)
      }
    })

    .catch(error => {
      console.error(error)
      $('#card_list').html(`<h5> Invalid Input. Please try again. </h5>`)
    })

}



const renderPokemonInfo = cardid => {
  $.get(`https://api.pokemontcg.io/v1/cards?id=${cardid}`)
    .then((card) => {
      cardArr = card.cards[0]
      $('#poke_name').text('')
      $('#poke_text').text('')
      $('#poke_pokedex').text('')
      $('#poke_hp').text('')
      $('#poke_rarity').text('')

      $('#poke_name').text(cardArr.name)
      $('#poke_text').text(cardArr.text)
      $('#poke_pokedex').text(`Pokedex Number: ${cardArr.nationalPokedexNumber}`)
      $('#poke_hp').text(`Health Points: ${cardArr.hp}`)
      $('#poke_rarity').text(`Rarity: ${cardArr.rarity}`)
    })
    .catch(error => console.error(error))
}
const addPokemonToDeck = (cardname, cardimg) => {
  let deck = JSON.parse(localStorage.getItem('pokeDeck'))
  let card = []
  card.push(cardname)
  card.push(cardimg)
  deck.push(card)
  localStorage.setItem('pokeDeck', JSON.stringify(deck))
  // Creates notification user when card gets added to the deck
  M.toast({ html: 'Card added to the deck' })
}

const renderYugiohInfo = cardname => {
  $.get(`https://db.ygoprodeck.com/api/v6/cardinfo.php?name=${cardname}`)
    .then(card => {
      cardArr = card[0]
      $('#yugi_name').text('')
      $('#yugi_desc').text('')
      $('#yugi_type').text('')

      $('#yugi_name').text(cardArr.name)
      $('#yugi_desc').text(cardArr.desc)
      $('#yugi_type').text(`Card Type: ${cardArr.type}`)
    })
    .catch(error => console.error(error))
}
const addYugiohToDeck = (cardname, cardimg) => {
  let deck = JSON.parse(localStorage.getItem('yugiDeck'))
  let card = []
  card.push(cardname)
  card.push(cardimg)
  deck.push(card)
  localStorage.setItem('yugiDeck', JSON.stringify(deck))
  M.toast({ html: 'Card added to the deck' })
}

$(document).on('click', (e) => {
  if (e.target.id === 'addDeck') {
    let card_id = e.target.parentElement.parentElement.parentElement.id
    let card_elem = e.target.parentElement.parentElement
    let card_img = card_elem.getAttribute('cardimg')
    let card_name = card_elem.getAttribute('cardname')
    if (isPokemon === true) {
      addPokemonToDeck(card_name, card_img)
    } else {
      addYugiohToDeck(card_name, card_img)
    }
  }
    else if (e.target.id === 'moreInfo') {
      if (isPokemon === true) {
        let card_id = e.target.parentElement.parentElement.parentElement.id
        renderPokemonInfo(e.target.parentElement.parentElement.parentElement.id)
      } else {
        renderYugiohInfo(e.target.parentElement.parentElement.parentElement.id)
      }
    }
   else if (e.target.id === 'yugi-alt-image') {
    if (isPokemon === false) {
      let card_id = e.target.parentElement.parentElement.parentElement.id
      renderaltYugioh(e.target.parentElement.parentElement.parentElement.id)
    }
  }
})


$('#set_search').on('click', (e) => {
  console.log(event)
})




// hide / show search by set option
setInterval(() => {
  if (!isPokemon) {
    $('#setSearch').show()
  }
  else {
    $('#setSearch').hide()
  }
}, 1000);
