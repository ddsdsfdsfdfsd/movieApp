const API_KEY = "28a318b1-b283-4c79-a7d2-8164aa8a9855";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
let API_URL_SIMILAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/?/similars`


const input = document.querySelector('#input')
const button = document.querySelector('#btn')
const button2 = document.querySelector('#btn2')
const output = document.querySelector('#output')

const getMovies = async (url) => {
    const req = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    })

    const res = await req.json()
    console.log(res.films)
    output.innerHTML = ''
    renderMovies(res.films)
}
getMovies(API_URL_POPULAR)

let filmId = ''

const renderMovies = (data) => {
    if (data.length > 0) {
        data && data.map(el => {
            const col = document.createElement('div')
            col.className = 'col-3'

            const filmBox = document.createElement('div')
            filmBox.className = 'film__box'

            const poster = document.createElement('img')
            poster.src = el.posterUrlPreview
            poster.className = 'film__poster'

            poster.addEventListener('click', () => {
                filmId = el.filmId
                getMoviesById(filmId)
            })

            const name = document.createElement('h2')
            name.textContent = el.nameRu
            name.className = 'film__nameRu'

            const ratingWrap = document.createElement('div')
            const rating = document.createElement('p')
            ratingWrap.className = 'film__rating-wrap'
            el.rating != 'null' ? rating.textContent = el.rating : rating.textContent = 'N/A'


            const genreWrap = document.createElement('p')
            genreWrap.textContent = el.genres.map(element => {
                return ` ${element.genre}`
            })


            const rezka = document.createElement('button')
            rezka.textContent = 'Смотреть фильм'
            rezka.className = 'rezka__button'


            const modal = document.querySelector('.modal')
            const backdrop = document.querySelector('.backdrop')
            const modalCloseButton = document.querySelector('.modalCloseButton')
            const watchFilm = document.querySelector('.watchFilm')


            const toggleModal = () => {
                modal.classList.add('modalActive')
                backdrop.classList.add('backdropActive')
                document.body.classList.add('hidden')
                watchFilm.style.display = 'block'
            }

            const removeModal = () =>{
                modal.classList.remove('modalActive')
                backdrop.classList.remove('backdropActive')
                document.body.classList.remove('hidden')
                watchFilm.style.display = 'none'
            }

            rezka.addEventListener('click', toggleModal)
            modalCloseButton.addEventListener('click', removeModal)
            backdrop.addEventListener('click', removeModal)

            rezka.addEventListener('click', () => {
                navigator.clipboard.writeText(el.nameRu)
                toggleModal()
                console.log('aha')

            })

            watchFilm.addEventListener('click', () =>{
                setTimeout(() => window.open(
                    'https://rezka.ag',
                    '_blank'
                ), 100)
            })


            ratingWrap.append(rating)
            filmBox.append(poster, ratingWrap, name, genreWrap, rezka)
            col.append(filmBox)
            output.append(col)
        })
    }

}


button.addEventListener('click', () => {
    if (input.value && input.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, "") && input.value.trim()) {
        getMovies(API_URL_SEARCH + input.value)
    } else {
        getMovies(API_URL_POPULAR)
    }
})

button2.addEventListener('click', () => {
    if (input.value && input.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, "") && input.value.trim()) {
        getMovies(API_URL_SEARCH + input.value)
    } else {
        getMovies(API_URL_POPULAR)
    }
})

const getMoviesById = async (id) => {
    const req = await fetch(API + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    })

    const res = await req.json()
    console.log(res)
    output.innerHTML = ''
    renderMoviesById(res)
}


const renderMoviesById = (data) => {
    const colFirst = document.createElement('div')
    colFirst.className = 'col-6'

    const filmBoxFirst = document.createElement('div')
    filmBoxFirst.className = 'film__box-first'

    const poster = document.createElement('img')
    poster.src = data.posterUrl
    poster.className = 'film__bigPoster'

    const ratings = document.createElement('div')
    ratings.className = 'film__ratings'

    const kinopoiskRate = document.createElement('p')
    kinopoiskRate.textContent = `Оценка на кинопоиске: ${data.ratingKinopoisk}`

    const imdbRate = document.createElement('p')
    data.ratingImdb == 'null' || data.ratingImdb == null ? imdbRate.textContent = `Оценки на imdb нет ` : imdbRate.textContent = `Оценка на imdb ${data.ratingImdb}` 
    console.log(data.ratingImdb)


    const colSecond = document.createElement('div')
    colSecond.classList = 'col-6'

    const filmBoxSecond = document.createElement('div')
    filmBoxSecond.className = 'film__box-second'

    const button = document.createElement('button')
    button.textContent = 'Return'
    button.className = 'film-return'

    button.addEventListener('click', () => {
        if (input.value && input.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, "") && input.value.trim()) {
            getMovies(API_URL_SEARCH + input.value)
        } else {
            getMovies(API_URL_POPULAR)
        }
    })

    const title = document.createElement('h2')
    title.textContent = data.nameRu
    title.className = 'film__title'

    const description = document.createElement('p')
    description.textContent = data.description
    description.className = 'film__description'

    const slogan = document.createElement('p')
    slogan.className = 'film__slogan'

    if (data.slogan === null || data.slogan === 'null') {
        slogan.textContent = 'Слогана нету.'

    } else {
        console.log(data.slogan)
        slogan.textContent = `Слоган: ${data.slogan}`
    }


    ratings.append(kinopoiskRate, imdbRate)
    filmBoxFirst.append(poster, ratings)
    colFirst.append(filmBoxFirst)

    filmBoxSecond.append(button, title, description, slogan)
    colSecond.append(filmBoxSecond)

    output.append(colFirst, colSecond)


    // let filmId = data.kinopoiskId
    // const API_URL_SIMILAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/similars`
    // getSimilarsFilms(API_URL_SIMILAR)
}


// const getSimilarsFilms = async (similar) => {
//     console.log(similar)
//     const req = await fetch(similar, {
//         headers: {
//             "Content-Type": "application/json",
//             "X-API-KEY": API_KEY
//         }
//     })
//     const res = await req.json()
//     console.log(res)
//     // output.innerHTML = ''
//     // renderSimilarsFilms(res)
// }


