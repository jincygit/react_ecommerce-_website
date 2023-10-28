# react_ecommerce-_website
react_ecommerce _website

## Getting Started

-  Clone this project
-  Start by installing npm if you don't have them already.
-  Run the project.


### Installation and Run

1. Clone the repo
   ```sh
   https://github.com/jincygit/react_todo_list_app.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
4. Run Node project
   ```sh
   npm start
   ```
### Built With

Here is the Technology Stack of this Application. which I have used to Built this Application.

-  React
-  HTML
-  CSS
-  Redux
-  Toast notification
-  react-router

### FUNCTIONALITY
**Navbar** 
    Show cart items count
    Show relevant navigation links
**All products page**
    Show list of products from the API (using the above server)
    Each product is editable by clicking on the “pencil” button. And we can edit that product inline. On finish editing the product, show some sort of Alert/Notification
    Each product is deletable, on clicking of the delete button you should delete the product and show some sort of Alert/Notification
    Implement a sort button. On clicking it should sort by “price” and show a cross button just beside it (see the sort view). On clicking the cross button remove the sort.
    Give button to add a product to cart
**Create page**
    On clicking of the Add button add the product in the DB, and show some sort of Alert/Notification
**Product detail page**
    Show all the details of a product
    Give button to add a product to cart
## Cart page
    Show all the items in the cart
### Folder Structure
    |--.gitignore
    |--package-lock.json
    |--package.json
    |--README.md
    |__>node_modules
        |--node module installed folder and files......
    |__>public
        |--public folder files.....
    |__>src
        |-->index.js
        |-->.gitignore
        |-->package-lock.json
        |-->package.json
        |-->README.md
        |__>api
            |-->index.js
        |__>components
            |-->index.js
            |-->App.js
            |-->CreateTodo.js
            |-->Loader.js
            |-->Navbar.js
            |-->Todo.js
        |__>pages
            |-->index.js
            |-->Home.js
        |__>styles
            |-->index.css
            |-->home.module.css
            |-->list.module.css
            |-->navbar.module.css
        |__>utils
            |-->index.js
            |-->constants.js
        




### URLS
http://localhost:3000/products -- for products
http://localhost:3000/         -- for home
http://localhost:3000/cart     -- for cart
http://localhost:3000/create   -- for add products
### INITIAL DATA BY THIS API URL
https://my-json-server.typicode.com/jincygit/react_ecommerce-_website/products
### Access the Application:
   http://localhost:3000/

### Hoisted url
    https://todolist-cb903.web.app/  