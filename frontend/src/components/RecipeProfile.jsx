.recipe-profile-container {
  display: flex;
  justify-content: space-around;
}

.recipe-profile-image {
  height: 350px;
  width: 500px;
}

.recipe-profile-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.capitalize-first-letter::first-letter {
  text-transform: uppercase;
}  
.recipe-profile-btn {
  --c-hover: #31b550; /* Color on hover */
  --c-bg: transparent; /* Background color */
  --b: 4px; /* Border width */
  --h: 1.8em; /* Height */
  
  font-family: system-ui, sans-serif;
  font-size: 1.5rem; /* Adjust the font size */
  text-transform: lowercase; /* Set text to lowercase */
  cursor: pointer;
  padding: .3em .3em; /* Adjust the padding */
  border: var(--b) solid var(--c-hover); /* Set default border */
  background-color: var(--c-bg); /* Set initial background color */
  color: var(--c-hover); /* Set initial text color */
  transition: background-color 0.4s, color 0.4s; /* Add transition */
  margin-right: 10px; /* Add margin between buttons */
}


.recipe-profile-btn:hover {
  background-color: var(--c-hover); /* Change background color on hover */
  color: #fff; /* Change text color on hover */
}

.recipe-profile-btn:active {
  box-shadow: 0 0 9e9q inset #0009; 
  background-color: var(--c-hover); /* Set active background color */
  color: #fff; /* Set active text color */
}
.nutrients-div{
  margin-top: 70px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  background-color: #31b550;
  /* margin-left: 155px;
  margin-right: 155px;
  padding: 1%;
  border-radius: 20%; */
}

