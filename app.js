

/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
// Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// BookCollection class
class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.saveToLocalStorage();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveToLocalStorage();
  }

  renderBooks() {
    // const bookList = document.getElementById('book-list');
    // bookList.innerHTML = '';

    // this.books.forEach((book, index) => {
    //   const bookItem = document.createElement('li');
    //   bookItem.classList.add('book-item');
    //   bookItem.innerHTML = `
    //     <span>"${book.title}" by ${book.author}</span>
    //     <button class="remove-btn" data-index="${index}">Remove</button>
    //   `;
    //   bookList.appendChild(bookItem);
    });

    const removeButtons = document.getElementsByClassName('remove-btn');
    for (const removeButton of removeButtons) {
      removeButton.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        this.removeBook(index);
        this.renderBooks();
      });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
    this.renderBooks();
  }

  loadFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
      this.renderBooks();
    }
  }
}

// Create a book collection instance
const bookCollection = new BookCollection();

// Get the add form and input elements
const addForm = document.getElementById('add-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');

// Attach event listener to the add form
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;

  if (title && author) {
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
});

// Load the book collection from localStorage on page load
bookCollection.loadFromLocalStorage();
