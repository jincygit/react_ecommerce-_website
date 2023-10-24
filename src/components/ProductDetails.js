import { useEffect, useState } from 'react';
// import CreateTodo from '../components/CreateTodo';
// import Loader from '../components/Loader';
// import Todo from '../components/Todo';
// import { getTodoList,addApiUrl,deleteApiUrl,editApiUrl } from '../api/index';
import styles from '../styles/home.module.css';
;


export const ProductDetails = () => {
  //new index for todo item
  const [todoIndex, setTodoIndex] = useState(201);
  //todo list
  const [todos, setTodos] = useState([]);
  //add button loading
  const [addingTodo, setAddingTodo] = useState(false);
  //page loader values
  const [loadingStatus, setLoadingStatus] = useState(true);
  //console.log("todos...", todos);
  const [rating, setRating] = useState(0);

  //handleRatingChange
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    //console.log("newRating  ",newRating)
  };
  
  
  
  useEffect(() => {
    // Call the fetchTodoList function for setting todo list
    //fetchTodoList(); 
  }, []);

  //page loader for initial loading
  // if (loadingStatus) {
  //   return <Loader />;
  // }

  return (
    
    <div className={styles.home}>
      <div className={styles.postsList}>
        
        {/* banner section starts */}
            <div className={styles.bannerdiv}>
              <img className={styles.bannerimg}
                src="https://www.banglashoppers.com/media/wysiwyg/slidershow/bs-home-01.jpg"/>
            </div>   
        {/* banner section ends */}
        {/* create product section starts */}
            <div>
              <div className={styles.createPost}>
                  <div className={styles.createpost_header+ " "+styles.createPostDiv}>
                  Create Product
                  </div>
                  {/* Product Name */}
                    <input type="text" className={styles.createPostInput} name="" value=""
                      placeholder='Enter Product Name'/>
                  
                  {/* Product Price */}
                    <input type="number" className={styles.createPostInput} name="" value=""
                      placeholder='Enter Product Price'/>
                  {/* Product image url */}
                    <input type="text" className={styles.createPostInput} name="" value=""
                      placeholder='Enter Product Image Url'/>
                  {/* Product rating */}

                    <div className={styles.rating}>
                    <p>Add Product Rating by clicking stars</p>
                      <input type="radio" id="star5" name="rating" value="5" onClick={() => handleRatingChange(5)}/>
                      <label for="star5"></label>
                      <input type="radio" id="star4" name="rating" value="4" onClick={() => handleRatingChange(4)}/>
                      <label for="star4"></label>
                      <input type="radio" id="star3" name="rating" value="3" onClick={() => handleRatingChange(3)}/>
                      <label for="star3"></label>
                      <input type="radio" id="star2" name="rating" value="2" onClick={() => handleRatingChange(2)}/>
                      <label for="star2"></label>
                      <input type="radio" id="star1" name="rating" value="1" onClick={() => handleRatingChange(1)}/>
                      <label for="star1"></label>
                    </div>

                  {/* Product description */}
                    <textarea
                      placeholder='Enter Product Details'
                      className={styles.addPost+" "+ styles.createPostTextarea}
                      // value={titleInputValue}
                      // onChange={(e) => setTitleInputValue(e.target.value)}
                      required
                    />


                  
                  {/* Add button starts */}
                    <div className={styles.createPostDiv}>
                      {/* if input is not present, then restrict button click  */}
                      <button
                        className={styles.addPostBtn}
                        // onClick={titleInputValue===""?null:handleAddTodo}
                        disabled={addingTodo}
                      >
                        {/* adding button text changes on loading period */}
                        {addingTodo ? 'Adding list...' : 'Add list'}
                      </button>
                    </div>
                  {/* Add button ends */}
              </div>
            </div>
        {/* create product section ends */}
        <div  className={styles.createpost_header + ' ' + styles.todolistheader}>Todo List</div>
        {/* {todos.map((todo) => (
          <Todo 
            todo = {todo} 
            key = {todo.id} 
            todos = {todos} 
            handleEditTodo = {handleEditTodo}  
            handleDeleteTodo = {handleDeleteTodo}   
            deletingTodo = {deletingTodo} 
            setDeletingTodo = {setDeletingTodo}  
            updatingTodo = {updatingTodo} 
            setUpdatingTodo = {setUpdatingTodo}     
          />
        ))} */}
        
      </div>
    </div>
  );
};


