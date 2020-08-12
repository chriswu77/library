
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    // }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// const HarryPotter = new Book('Harry Potter', 'J.K. Rowling', 500, false);
const HungerGames = new Book('The Hunger Games', 'Suzanne Collins', 374, false)
const ToKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 324, true);

// addBookToLibrary(HungerGames);
// addBookToLibrary(ToKillAMockingbird);

const libraryContainer = document.querySelector('.grid');

function render() {
    libraryContainer.innerHTML = '';
    myLibrary.forEach(book => {
        const card = document.createElement('div')
        const index = myLibrary.indexOf(book);
        card.setAttribute('data-index', `${index}`);
        card.classList.add('book-card');

        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = book.author;
        card.appendChild(author);

        const pages = document.createElement('p');
        pages.classList.add('pages');
        const string = book.pages.toString();
        pages.textContent = `${string} pages`;
        card.appendChild(pages);

        libraryContainer.appendChild(card);     
    })
}

// render();

const addBtn = document.querySelector('#add-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('#close-btn');
const newBookForm = document.querySelector('#new-book-form');

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // read in title, author, pages, read status form values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let readStatus = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, readStatus);
    console.log(newBook);
    addBookToLibrary(newBook);
    render();
    // close form
    modal.style.display = 'none';
    //reset form values
    newBookForm.reset();
})

