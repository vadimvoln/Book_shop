import { CONFIG } from '../config'
import { Card, cardBtnListener } from '../components/Card'
import { getActiveCategory } from './Category'

function LoadMore() {
  const html = `<button class="moreBtn">load more</button>`
  return html
}

const loadMoreListener = (startIndex, maxResults, cart) => {
  const btnLoadMore = document.querySelector('.moreBtn')
  const bookSection = document.querySelector('.books')
  const listener = () => {
    startIndex += maxResults

    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${getActiveCategory()}"&key=${CONFIG.key}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`
    fetch(url)
      .then(data => data.json())
      .then(data => {
        const books = data.items
        const booksList = bookSection.querySelector('.books__list')
        books.map(book => {
          booksList.insertAdjacentHTML('beforeend', Card(book))
        })
        cardBtnListener(cart)
      })
      .catch(() => alert('Ошибка получения данных с сервера'))
  }

  btnLoadMore.addEventListener('click', listener)
}

export { LoadMore, loadMoreListener }