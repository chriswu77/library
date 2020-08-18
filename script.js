
// let myLibrary = [];
let myLibrary;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    // }
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

// const HarryPotter = new Book('Harry Potter', 'J.K. Rowling', 500, false);
const HungerGames = new Book('The Hunger Games', 'Suzanne Collins', 374, false)
const ToKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 324, true);

// addBookToLibrary(HungerGames);
// addBookToLibrary(ToKillAMockingbird);

const libraryContainer = document.querySelector('.grid');

Book.prototype.initialReadToggle = function() {
    let string;
    if (this.read) {
        string = "checked";
    } else {
        string = "";
    }
    return string;
};

function render() {
    libraryContainer.innerHTML = '';
    myLibrary.forEach(book => {
        // book.prototype = Book;
        console.log(Object.getPrototypeOf(book));
        const card = document.createElement('div')
        const index = myLibrary.indexOf(book);
        card.setAttribute('data-index', `${index}`);
        card.classList.add('book-card');

        const toggleLabel = document.createElement('label');
        toggleLabel.classList.add('switch');
        console.log(book);
        toggleLabel.innerHTML = `<input type="checkbox" id="toggle-btn-${index}" ${book.initialReadToggle()}><span class="slider round"></span>`;
        console.log(toggleLabel.innerHTML);
        card.appendChild(toggleLabel);

        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        const btnSpan = document.createElement('span');
        btnSpan.classList.add('trash-style');
        const trashIconHTML = '<i class="far fa-trash-alt"></i>';
        btnSpan.innerHTML = trashIconHTML;
        trashBtn.appendChild(btnSpan);
        card.appendChild(trashBtn);

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
};

const addBtn = document.querySelector('#add-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('#close-btn');
const newBookForm = document.querySelector('#new-book-form');
const submitBtn = document.getElementById('submit-btn');

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // read in title, author, pages, read status form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, readStatus);
    addBookToLibrary(newBook);
    saveToStorage(myLibrary);
    render();
    // close form
    modal.style.display = 'none';
    //reset form values
    newBookForm.reset();
    submitBtn.setAttribute('style', 'opacity: 0.25');
});

function formValidation() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    console.log(title,author,pages);
    if (title !== '' && author !== '' && pages !== '') {
        //apply active state css
        submitBtn.setAttribute('style', 'opacity: 1; border: 1.75px solid #5898DD;');
    } else {
        // grey it out again
        submitBtn.setAttribute('style', 'opacity: 0.25');
    }
};

document.addEventListener('keyup', e => {
    formValidation();
});


Book.prototype.toggleRead = function() {
    this.read ? this.read = false: this.read = true;
};

libraryContainer.addEventListener('click', e => {
    const trashBtn = e.target.closest('.trash-btn');
    const readBtn = e.target.closest('.slider');
    if (trashBtn) {
        const bookDOM = trashBtn.parentElement;
        const index = bookDOM.dataset.index;
        //remove book from array
        myLibrary.splice(index, 1);
        saveToStorage(myLibrary);
        // update UI
        render();
    } else if (readBtn) {
        const bookDOM = readBtn.parentElement.parentElement;
        const index = bookDOM.dataset.index;
        const book = myLibrary[index];

        // update the UI to reflect new read value
        const toggleBtn = document.getElementById(`toggle-btn-${index}`);

        // change the read value
        console.log(book.read);
        book.toggleRead();
        console.log(book.read);
        // console.log(toggleBtn.checked);
    }
});

function saveToStorage(libraryArray) {
    localStorage.setItem('library', JSON.stringify(libraryArray));
};

window.addEventListener('load', () => {
    if (!localStorage.getItem('library')) {
        myLibrary = [];
    } else {
        myLibrary = JSON.parse(localStorage.getItem('library'));

        // re-create the books with the Book constructor
        myLibrary = myLibrary.map(book => {
        return new Book(book.title, book.author, book.pages, book.read)
        });
        render();
    }
});