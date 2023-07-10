/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
// /* eslint-disable no-use-before-define */
// /* eslint-disable no-restricted-syntax */
// // Get the book list element
// const bookList = document.getElementById('book-list');

// // Get the add form and input elements
// const addForm = document.getElementById('add-form');
// const titleInput = document.getElementById('title-input');
// const authorInput = document.getElementById('author-input');

// // Initialize the book collection array
// let books = [];

// // Function to render the book collection
// function renderBooks() {
//   // Clear the book list
//   bookList.innerHTML = '';

//   // Render each book in the collection
//   books.forEach((book, index) => {
//     const bookItem = document.createElement('li');
//     bookItem.classList.add('book-item');
//     bookItem.innerHTML = `
//       <p><span>${book.title}</span> by <span>${book.author}</span></p>
//       <button class="remove-btn" data-index="${index}">Remove</button>
//     `;
//     bookList.appendChild(bookItem);
//   });

//   // Attach event listeners to remove buttons
//   const removeButtons = document.getElementsByClassName('remove-btn');
//   for (const removeButton of removeButtons) {
//     // eslint-disable-next-line no-use-before-define
//     removeButton.addEventListener('click', removeBook);
//   }
// }

// // Function to add a new book to the collection
// function addBook(event) {
//   event.preventDefault();

//   // Get the input values
//   const title = titleInput.value;
//   const author = authorInput.value;

//   // Create a new book object
//   const newBook = { title, author };

//   // Add the new book to the collection
//   books.push(newBook);

//   // Clear the input fields
//   titleInput.value = '';
//   authorInput.value = '';

//   // Render the updated book collection
//   renderBooks();

//   // Save the updated collection to localStorage
//   saveToLocalStorage();
// }

// // Function to remove a book from the collection
// function removeBook(event) {
//   const { index } = event.target.dataset;

//   // Remove the book from the collection
//   books.splice(index, 1);

//   // Render the updated book collection
//   renderBooks();

//   // Save the updated collection to localStorage
//   saveToLocalStorage();
// }

// // Function to save the book collection to localStorage
// function saveToLocalStorage() {
//   localStorage.setItem('books', JSON.stringify(books));
// }

// // Function to load the book collection from localStorage
// function loadFromLocalStorage() {
//   const storedBooks = localStorage.getItem('books');
//   if (storedBooks) {
//     books = JSON.parse(storedBooks);
//     renderBooks();
//   }
// }

// // Attach event listeners
// addForm.addEventListener('submit', addBook);

// // Load the book collection from localStorage on page load
// loadFromLocalStorage();

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
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
        <span>"${book.title}" by ${book.author}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      bookList.appendChild(bookItem);
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
