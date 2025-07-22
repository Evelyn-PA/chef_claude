export default function IngredientsList(props) {
    const ingredientsListItems = props.listOfIngredient.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section>
            <h2>Ingredients on hand</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.listOfIngredient.length > 3 &&
                <div className="get-recipe-container">
                    <div className="getRecipeBox" ref = {props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button className="getRecipeBtn" onClick={props.showRecipe}> {props.checkShowRecipe? "Change a new recipe": "Get a recipe"}</button>
                </div>}
        </section>
    )
}