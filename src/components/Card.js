import { formatAuthor, formatDescr, formatPrice, fomatAvRate } from './Format'
import placeholderImg from '../img/placeholderImg.png'

function Card(book) {
  const authors = formatAuthor(book.volumeInfo.authors)
  const title = book.volumeInfo.title
  const description = formatDescr(book.volumeInfo.description)
  const price = formatPrice(book.saleInfo.listPrice)
  const imageUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : placeholderImg
  const id = book.id
  const averageRating = fomatAvRate(book.volumeInfo.averageRating) ? fomatAvRate(book.volumeInfo.averageRating) : ''
  const ratingCount = book.volumeInfo.ratingsCount ? `${book.volumeInfo.ratingsCount}  revies` : ""

  const html = `<li class="books__item" data-id="${id}">
  <div style="background-image: url(${imageUrl});" class="cover"></div>
  <div class="descr">
    <p class="author">${authors}</p>
    <h2 class="title">${title}</h2>
    <div class="rate">
      ${averageRating}
      <span>${ratingCount}</span>
    </div>
    <p class="text">${description}</p>
    <div class="price">${price}</div>
    <button class="buyBtn" data-id="${id}">buy now</button>
  </div>
</li>`
  return html
}

const cardBtnListener = (cart) => {
  const booksItems = document.querySelectorAll(".books__item")

  const listener = (event) => {
    const cartCounterElement = document.querySelector('#cartCounter')
    let curCount = +cartCounterElement.textContent
    if (!cart.includes(event.target.dataset.id)) {
      cartCounterElement.textContent = curCount + 1
      event.target.classList.add('buyBtn-inCart')
      event.target.textContent = 'in the cart'
      cart.push(event.target.dataset.id)
      localStorage.setItem("cart", JSON.stringify({ "cart": cart }))
    } else {
      cartCounterElement.textContent = curCount - 1
      event.target.classList.remove('buyBtn-inCart')
      event.target.textContent = 'buy now'
      cart.splice(cart.indexOf(event.target.dataset.id, 1))
      localStorage.setItem("cart", JSON.stringify({ "cart": cart }))
    }

  }

  booksItems.forEach(book => {
    const bookBtn = book.querySelector('.buyBtn')
    const cartCounterElement = document.querySelector('#cartCounter')
    let curCount = +cartCounterElement.textContent
    if (cart.includes(bookBtn.dataset.id)) {
      cartCounterElement.textContent = curCount + 1
      bookBtn.classList.add('buyBtn-inCart')
      bookBtn.textContent = 'in the cart'
      bookBtn.addEventListener('click', listener)
    } else {
      bookBtn.addEventListener('click', listener)
    }
  })
}

export { Card, cardBtnListener }