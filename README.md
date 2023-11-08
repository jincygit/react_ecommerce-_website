# react_ecommerce-_website
react_ecommerce _website

## Getting Started

-  Clone this project
-  Start by installing npm if you don't have them already.
-  Run the project.


### Installation and Run

1. Clone the repo
   ```sh
   https://github.com/jincygit/react_ecommerce-_website.git
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
        --show **APIdata** from API 'https://my-json-server.typicode.com/jincygit/react_ecommerce-_website/products' at page load
        -- also fetch data from firebase db
        
    Each product is editable by clicking on the “pencil” button. And we can edit that product inline. On finish editing the product, show some sort of Alert/Notification
        -- product data is editable
        -- also update in firebase db
        -- show sucess Alert/Notification and error notification

    Each product is deletable, on clicking of the delete button you should delete the product and show some sort of Alert/Notification
        -- product is deletable
        -- also do delete in firebase db
        -- show sucess Alert/Notification and error notification

    Implement a sort button. On clicking it should sort by “price” and show a cross button just beside it (see the sort view). On clicking the cross button remove the sort.
        -- in product page there exist a button, **Sort by Price** 
                --- if **Sort by Price** button clicked, data in product page will sort by price,also an close icon will appear
                --- iif close button clicked, unsorted data(olddata) will appear, and also close button will disappear

    Give button to add a product to cart
        -- by clicking **Add to cart**, the product can  be add to cart
                ---if product already in cart then, it will increase the product cart count
                ---if product not in cart , then it will add particular product into cart with count 1
**Create page**
    On clicking of the Add button add the product in the DB, and show some sort of Alert/Notification
        -- product data will add to firebase database

**Product detail page**
    -- Show all the details of a product
    -- Give button to add a product to cart
## Cart page
    Show all the items in the cart
        --cart items with count will show in cart page
        --using plus button and minus button we can change cart product count
        --also cart product can be remove 
### Folder Structure
    |--.gitignore
    |--package-lock.json
    |--package.json
    |--README.md
    |-->db.json
    |__>node_modules
        |--node module installed folder and files......
    |__>public
        |--public folder files.....
    |__>src
        |-->index.js
        |-->firebase.js
        |-->App.js
        |-->index.css
        |-->style.css
        |__>api
            |-->index.js
        |__>components
            |-->Cart.js
            |-->CreateProduct.js
            |-->Loader.js
            |-->Navbar.js
            |-->ProductDetails.js
            |-->ProductItem.js
            |-->ProductList.js
        |__>pages
            |-->Home.js
        |__>redux
            |__>actions
                |-->cartActions.js
                |-->productActions.js
            |__>reducers
                |-->cartReducer.js
                |-->productReducer.js
            |__>store
                |-->index.js
        |__>styles
            |-->index.css
            |-->home.module.css
            |-->list.module.css
            |-->navbar.module.css
        |__>utils
            |-->index.js
            |-->constants.js
        




### URLS
http://localhost:3000/              -- for products page
http://localhost:3000/cart          -- for cart
http://localhost:3000/create        -- for add products
http://localhost:3000/details/(id)  -- for products detail page
### INITIAL DATA BY THIS API URL
https://my-json-server.typicode.com/jincygit/react_ecommerce-_website/products
### Access the Application:
   http://localhost:3000/

### Hoisted url
    https://react-ecommerce-app-e50bd.web.app/

    