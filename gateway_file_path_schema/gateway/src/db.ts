const authors = [
    {
        name: 'Sameer',
        age: 29,
        id: 1
    },
    {
        name: 'Gunjan',
        age: 32,
        id: 2
    },
    {
        name: 'AMit',
        age: 30,
        id: 3
    },
]
let books = [
    {
        id: 1,
        title: 'Book 1',
        publication: 'Publication 1',
        description: 'Description for Book 1',
        author: authors[2],
    },
    {
        id: 2,
        title: 'Book 2',
        publication: 'Publication 2',
        description: 'Description for Book 2',
        author: authors[0],
    },
    {
        id: 3,
        title: 'Book 3',
        publication: 'Publication 3',
        description: 'Description for Book 3',
        author: authors[2],
    },
    {
        id: 4,
        title: 'Book 4',
        publication: 'Publication 4',
        description: 'Description for Book 4',
        author: authors[0],
    },
    {
        id: 5,
        title: 'Book 5',
        publication: 'Publication 5',
        description: 'Description for Book 5',
        author: authors[1],
    },
    {
        id: 6,
        title: 'Book 6',
        publication: 'Publication 6',
        description: 'Description for Book 6',
        author: authors[2],
    },
    {
        id: 7,
        title: 'Book 7',
        publication: 'Publication 7',
        description: 'Description for Book 7',
        author: authors[1],
    },
    {
        id: 8,
        title: 'Book 8',
        publication: 'Publication 8',
        description: 'Description for Book 8',
        author: authors[1],
    },
    {
        id: 9,
        title: 'Book 9',
        publication: 'Publication 9',
        description: 'Description for Book 9',
        author: authors[1]
    },
    {
        id: 10,
        title: 'Book 10',
        publication: 'Publication 10',
        description: 'Description for Book 10',
        author: authors[0],
    },
];
type Book = {
    id: number;
    title: string;
    publication: string;
    description: string;
    author: Author;
};
type Author = {
    name: string;
    id: number;
    age: number;
    books: [Book]
}

export const getBookById = (id: number) => books.find(obj =>obj.id ==id);
export const getAllBooks = () => books;
export const getBooksByAuthor = (authorId: number) => 
{
    const authorBooks = books.filter(obj => obj.author.id == authorId);
    console.log(authorBooks);
    console.log('authorid', authorId);
    return authorBooks;
}
export const addBook = (book: Book) => {
    books.push(book);
}
export const deleteBook = (bookId: number) => {
    books = books.filter(obj => obj.id != bookId);
}
export const getAllAuthors = () => authors;
export const getAuthorById = (id: number) => authors.find(obj => obj.id == id);
export const addAuthor = (author: Author) => {
    authors.push(author);
}