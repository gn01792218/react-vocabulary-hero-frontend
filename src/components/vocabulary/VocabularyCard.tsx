import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example, Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"

interface Props{
    vocabulary:Vocabulary
}
function VocabularyCard({vocabulary}:Props) {
    const navigate = useNavigate()
    const { getExamplesAndStences } = useVocabulary()
    const [examples, setExamples] = useState<Example[]>([])
    async function onGetExamplesAndStencesButtonClick(){
        const res = await getExamplesAndStences(vocabulary.id)
        setExamples([...res.examples])
    }
    function goToVocabularyDetial(){
        navigate(`/VocabularyDetial/${vocabulary.id}`)
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <div className="cursor-pointer" onClick={goToVocabularyDetial}>
            <p>{vocabulary.spelling} {vocabulary.pronunciation}</p>
            </div>
            <button onClick={onGetExamplesAndStencesButtonClick} className="border-1 border-green-200">看解釋和例句</button>
            <ul>
                {
                    examples.map((example)=>{
                        return (
                            <ExampleCard withCreateForm={false} vocabularyId={vocabulary.id} example={example}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default VocabularyCard