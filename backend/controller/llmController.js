const axios = require('axios')

const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utils/apperror");
const catchasync = require("../utils/catchasync");
// 1. Configuration
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

// 3. Generate Content

exports.generateAIContent = catchasync(async (req,res,next)=> {
const recipeid = req.body.recipeid
let config = {
    method : 'GET',
    url : `https://apis-new.foodoscope.com/recipe/${recipeid}`,
    headers : {
        'content-type' : 'application/json',
        'Authorization' : `Bearer ${process.env.RECIPE_API_KEY}`
    }
}

const recipeinfo = await axios(config);

if(!recipeinfo.data.payload.ingredients){
    return next(new AppError("No ingredients Found in the payload or payload "))
}
const ingredientArray = recipeinfo.data.payload.ingredients.map(ingredient => ingredient.ingredient);
//console.log(ingredientArray);

const stringifiedData = recipeinfo.data.payload.instructions;
// //console.log(stringifiedData);
 const recipeString = stringifiedData.join(' ');
// //console.log(recipeString);
  
    if(!recipeString){
        return next (new AppError("No Instructions were fetched from api",404))
    };
      
    
    const prompt = `Convert the following instructions into easy stepwise instructions: ${recipeString} give direct html code using list and without \\n  for e.g STEP-1 : cook the food <br> STEP-2 : boil it , also cover the text like STEP-1 in <b> tag `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const restext = response.text()
    //console.log(response.text());

    const finalHTMLinstruction = restext.replace(/\n/g, ' ');



    res.status(201).json({
        status : "success",
        instructions : finalHTMLinstruction,
        ingredients : ingredientArray
    })

    //returning the instruction in the html code format and the ingredients in the array format

})


exports.generateAIDescription = catchasync(async (req,res,next) =>{
    const recipename = req.body.recipename
    const prompt = `Give small description about the food ${recipename} in 2 line`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const restext = response.text()

    console.log(restext)

    res.status(200).json({
        status : "success",
        description : restext
    })
})










// async function generateContent() {
//   try {
//     const prompt = `Convert the following into easily understandable stepwise instruction ${query} `;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     console.log(response.text());

//     res.status(201).json({
//         status : "success",
//         response : response.text()
//     })

//   } catch (error) {
//     console.error('Error generating content:', error);
//     return next (new AppError("Something went wrong in the api",400))
//   }
// }

// // Run the function
// generateContent();