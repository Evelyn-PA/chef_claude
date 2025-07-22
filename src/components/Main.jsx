import React from "react";
import Out from "./components2/claudeRecipe.jsx"
import IngredientList from "./components2/IngredientsList"
import { getRecipeFromAI } from "../ai.js"
import { Behavior } from "@google/genai";
export default function main() {
    const [ingredients, setIngredients] = React.useState([])
    function submit(formData) {
        const newIngredient = formData.get("ingredient");
        //Check if the ingredient is typed
        if (newIngredient !== "") {
            setIngredients(preIngredient => [... //Using spread
                preIngredient, newIngredient]) //Add the new ingredient to the list with React State
        }
    }

    //State represent the recipe
    const [recipe, setRecipe] = React.useState("")

    //Use ref
    const recipeSection = React.useRef(null)

    //Use effect
    React.useEffect(() =>{
        if (recipe !== "" && recipeSection.current!==null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    //Check the recipe whether is show or not
    const [hasShowRecipe, setHasShowRecipe] = React.useState(false)

    //click action show the recipe
    async function showRecipe() {
        const recipeMarkDown = await getRecipeFromAI(ingredients)
        setRecipe(recipeMarkDown)
        setHasShowRecipe(true)
    }



    console.log(showRecipe)

    return (
        <>
            <form className="form" action={submit}>
                <input
                    type="text"
                    placeholder="Enter your ingredients"
                    name="ingredient"
                    aria-label="Add ingredient"
                />
                <button type="submit">+ Add</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientList
                ref = {recipeSection}
                    listOfIngredient={ingredients}
                    showRecipe={showRecipe}
                    checkShowRecipe={hasShowRecipe}
                />}

            {recipe && <Out recipe={recipe} />}
        </>
    )
}