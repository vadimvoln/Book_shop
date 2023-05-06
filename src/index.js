import './styles/index.scss'
import { Card, cardBtnListener } from './components/Card'
import { Category, categoryListener } from './components/Category'
import { swiper } from './components/Slider'
import { CONFIG } from './config'
import { LoadMore, loadMoreListener } from './components/LoadMore'

//cart state
const cartObj = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : { 'cart': [] }
const cart = cartObj['cart']

//category state
const categoriesData = ['Architecture', 'Art & Fashion', 'Biography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Food & Drink', 'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel & Maps']
const activeCategory = categoriesData[0]

const categoryList = document.querySelector('.categories')
categoryList.insertAdjacentHTML('afterbegin', Category(categoriesData, activeCategory))
categoryListener(cart)

let startIndex = 0
let maxResults = 6

const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${activeCategory}"&key=${CONFIG.key}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`

const bookSection = document.querySelector('.books')

fetch(url)
  .then(data => data.json())
  .then(data => {
    const books = data.items
    const booksList = bookSection.querySelector('.books__list')
    books.map(book => {
      booksList.insertAdjacentHTML('beforeend', Card(book))
    })
    cardBtnListener(cart)
    bookSection.insertAdjacentHTML('beforeend', LoadMore())
    loadMoreListener(startIndex, maxResults, cart)
  })
  .catch(() => alert('Ошибка получения данных с сервера'))

