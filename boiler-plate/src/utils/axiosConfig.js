// interface Book {
//     isbn : string;
//     name : string;
//     price : number;
//     author : string;
// }

// const instance = axios.create({
//     baseURL: 'https://ecom-backend-example/api/v1',
//     timeout: 15000,
// });

// const responseBody = (response: AxiosResponse) => response.data;

// const bookRequests = {
//     get: (url: string) => instance.get<Book>(url).then(responseBody),
//     post: (url: string, body: Book) => instance.post<Book>(url, body).then(responseBody),
//     delete: (url: string) => instance.delete<Book>(url).then(responseBody),
// };

// export const Books {
//     getBooks : () : Promise<Book[]> => bookRequests.get('/books'),
//     getSingleBook : (isbn : string) : Promise<Book> => bookRequests.get(`/books/${isbn}`),
//     addBook : (book : Book) : Promise<Book> => bookRequests.post(`/books`, book),
//     deleteBook : (isbn : string) : Promise<Book> => bookRequests.delete(`/books/${isbn}`)
// }
