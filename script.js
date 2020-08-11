
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

addBookToLibrary(HungerGames);
addBookToLibrary(ToKillAMockingbird);

const libraryContainer = document.querySelector('.grid');

function render() {
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

render();
