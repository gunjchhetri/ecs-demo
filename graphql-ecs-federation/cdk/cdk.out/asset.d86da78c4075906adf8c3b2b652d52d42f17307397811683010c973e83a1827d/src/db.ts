const authors = [
    {
        name: 'Sameer',
        age: 29,
        id: 1,
        books:[{id:1}]
    },
    {
        name: 'Gunjan',
        age: 32,
        id: 2,
        books:[{id:3},{id:1}]
    },
    {
        name: 'AMit',
        age: 30,
        id: 3,
        books:[{id:2},{id:1}]
    },
]
 
type Book = {
    id: number;
};
type Author = {
    name: string;
    id: number;
    age: number;
    books: [Book]
}
export const getAllAuthors = () => authors;
export const getAuthorById = (id: number) => authors.find(obj => obj.id == id);
export const addAuthor = (author: Author) => {
    authors.push(author);
}