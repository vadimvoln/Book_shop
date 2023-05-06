import { CONFIG } from '../config'
import { Card, cardBtnListener } from './Card'

let activeCategory = ''

function Category(data) {
  let html = ``
  data.forEach((category, index) => {
    if (index === 0) {
      html += `<li class="category category-active">${category}</li>`
    } else {
      html += `<li class="category">${category}</li>`
    }

  })
  activeCategory = data[0]
  return html
}



const categoryListener = (cart) => {
  const categoryNodeList = document.querySelectorAll('.category')
  const listener = (event) => {
    if (event.target.classList.contains('category-active')) return
    categoryNodeList.forEach(item => {
      if (item.classList.contains('category-active')) {
        item.classList.remove('category-active')
        return
      }
    })

    event.target.classList.add('category-active')
    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${event.target.innerText}"&key=${CONFIG.key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`

    activeCategory = event.target.innerText

    fetch(url)
      .then(data => data.json())
      .then(data => {
        const books = data.items
        const booksList = document.querySelector('.books__list')
        booksList.querySelectorAll('.books__item').forEach(item => booksList.removeChild(item))
        books.map(book => booksList.insertAdjacentHTML('beforeend', Card(book)))
        cardBtnListener(cart)
      })
      .catch(() => alert('Ошибка получения данных с сервера'))
  }
  categoryNodeList.forEach(item => item.addEventListener('click', listener))
}

const getActiveCategory = () => {
  return activeCategory
}

export { Category, categoryListener, getActiveCategory }