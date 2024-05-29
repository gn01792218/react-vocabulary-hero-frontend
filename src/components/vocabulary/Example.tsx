import { Example } from "../../types/vocabulary"

interface Props{
    example:Example
}
function ExampleCard({example}:Props) {
    return (
        <div className='border-red-200 border-2 p-5'>
                <p>{example.definition}</p>
            <ul>
                {
                    example.sentences.map((sentence)=>{
                        return (
                            <div>
                                <p>{sentence.en}</p>
                                <p>{sentence.zh}</p>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default ExampleCard