import ReactMarkdown from 'react-markdown'
export default function Recipe(props) {
    return (
        <section> 
            <h2 id="h2">Recommended Recipe</h2>
            <ReactMarkdown className='ai-recommend'>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}