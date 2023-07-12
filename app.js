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
    const bookSection = document.getElementById('books-section');
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
        <span>${book.title} by ${book.author}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      bookList.appendChild(bookItem);
      bookSection.appendChild(bookList);
    });

    const removeButtons = document.getElementsByClassName('remove-btn');
    for (let i = 0; i < removeButtons.length; i += 1) {
      const removeButton = removeButtons[i];
      removeButton.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        this.removeBook(index);
        this.renderBooks();
      });
    }
  }

  // saveToLocalStorage() {
  //   localStorage.setItem('books', JSON.stringify(this.books));
  //   this.renderBooks();
  // }

  // loadFromLocalStorage() {
  //   const storedBooks = localStorage.getItem('books');
  //   if (storedBooks) {
  //     this.books = JSON.parse(storedBooks);
  //     this.renderBooks();
  //   }
  // }
}

// Create a book collection instance
const bookCollection = new BookCollection();

// Navigation links
const navLinks = document.getElementsByClassName('nav-link');

// Content sections
const sections = {
  books: document.getElementById('books-section'),
  'add-book': document.getElementById('add-book-section'),
  'contact-info': document.getElementById('contact-info-section'),
};

// Function to switch active section
function switchSection(event) {
  event.preventDefault();
  const { section } = event.target.dataset;

  // Remove active class from current section
  const currentSection = document.querySelector('.content-section.active');
  currentSection.classList.remove('active');

  // Add active class to selected section
  sections[section].classList.add('active');

  // If the selected section is the books section, render the books
  if (section === 'books') {
    bookCollection.loadFromLocalStorage();
    bookCollection.renderBooks();
  }

  // Remove active class from current link
  const currentLink = document.querySelector('.nav-link.active');
  currentLink.classList.remove('active');

  // Add active class to selected link
  event.target.classList.add('active');
}

window.addEventListener('load', () => {
  bookCollection.loadFromLocalStorage();
  bookCollection.renderBooks();
});

// Attach event listeners to navigation links
// for (const link of navLinks) {
//   link.addEventListener('click', switchSection);
// }
for (let i = 0; i < navLinks.length; i += 1) {
  const link = navLinks[i];
  link.addEventListener('click', switchSection);
}

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
