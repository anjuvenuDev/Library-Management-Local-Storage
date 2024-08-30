document.addEventListener('DOMContentLoaded', loadBooks);
document.getElementById('bookForm').addEventListener('submit', addBook);

function loadBooks() {
    const books = getBooksFromStorage();
    books.forEach(book => displayBook(book));
}

function addBook(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') {
        alert('Please fill in all fields');
        return;
    }

    const book = { title, author, isbn };
    displayBook(book);
    storeBookInStorage(book);

    document.getElementById('bookForm').reset();
}

function displayBook(book) {
    const bookList = document.getElementById('bookList');
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editBook(book, li);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => removeBook(book, li);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    bookList.appendChild(li);
}

function storeBookInStorage(book) {
    const books = getBooksFromStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function getBooksFromStorage() {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
}

function editBook(book, listItem) {
    const newTitle = prompt('Edit Book Title', book.title);
    const newAuthor = prompt('Edit Book Author', book.author);
    const newIsbn = prompt('Edit Book ISBN', book.isbn);

    if (newTitle === null || newAuthor === null || newIsbn === null || newTitle === '' || newAuthor === '' || newIsbn === '') {
        alert('Please fill in all fields');
        return;
    }

    const updatedBook = { title: newTitle, author: newAuthor, isbn: newIsbn };

    listItem.textContent = `${updatedBook.title} by ${updatedBook.author} (ISBN: ${updatedBook.isbn})`;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editBook(updatedBook, listItem);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => removeBook(updatedBook, listItem);

    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    updateBookInStorage(book, updatedBook);
}

function updateBookInStorage(oldBook, newBook) {
    let books = getBooksFromStorage();
    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === oldBook.isbn) {
            books[i] = newBook;
            break;
        }
    }
    localStorage.setItem('books', JSON.stringify(books));
}


function removeBook(book, listItem) {
    listItem.remove();
    removeBookFromStorage(book);
}

function removeBookFromStorage(book) {
    let books = getBooksFromStorage();
    books = books.filter(b => b.isbn !== book.isbn);
    localStorage.setItem('books', JSON.stringify(books));
}
console.log(getBooksFromStorage())