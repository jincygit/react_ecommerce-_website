const API_ROOT_URL = 'https://jsonplaceholder.typicode.com';
const DEFAULT_API_URL = 'https://jsonplaceholder.typicode.com/todos';
const ECOMMERCE_API_URL = 'https://my-json-server.typicode.com/jincygit/react_ecommerce-_website/products';

// doc url - https://jsonplaceholder.typicode.com/guide/
export const API_URLS = {
  todoList: (page, limit) => `${API_ROOT_URL}/todos?_page=${page}&_limit=${limit}`,
  defaultTodo: () => `${DEFAULT_API_URL}/`,
  getProducts: () => `${ECOMMERCE_API_URL}/`,
  editTodoApi: (id) => `${DEFAULT_API_URL}/${id}`,
};

export const LOCALSTORAGE_TOKEN_KEY = '__codeial_token__';
