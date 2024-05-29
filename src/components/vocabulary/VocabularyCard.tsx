import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example, Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./Example"

interface Props{
    vocabulary:Vocabulary
}
function VocabularyCard({vocabulary}:Props) {
    const { getExamplesAndStences } = useVocabulary()
    const [examples, setExamples] = useState<Example[]>([])
    async function onGetExamplesAndStencesButtonClick(){
        const res = await getExamplesAndStences(vocabulary.id)
        setExamples([...res.examples])
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <p>{vocabulary.spelling} {vocabulary.pronunciation}</p>
            <button onClick={onGetExamplesAndStencesButtonClick} className="border-1 border-green-200">看解釋和例句</button>
            <ul>
                {
                    examples.map((example)=>{
                        return (
                            <ExampleCard example={example}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default VocabularyCard