import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example, Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"

interface Props{
    vocabulary:Vocabulary
}
function VocabularyCard({vocabulary}:Props) {
    const navigate = useNavigate()
    const { getVocabularyIncludeExamplesAndStences } = useVocabulary()
    const [examples, setExamples] = useState<Example[]>([])
    async function onGetExamplesAndStencesButtonClick(){
        const res = await getVocabularyIncludeExamplesAndStences(vocabulary.id)
        if(!res) return 
        setExamples([...res?.examples])
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
            {
                examples.length?
                <ul>
                    {
                        examples.map((example)=>{
                            return (
                                <ExampleCard editable={false} vocabularyId={vocabulary.id} example={example}/>
                            )
                        })
                    }
                </ul> : 
                <p>尚無解釋</p>
            }
            <button className="border-2 border-green-500" onClick={()=>navigate(`EditVocabulary/${vocabulary.id}`)}>編輯單字</button>
        </div>
    )
}
export default VocabularyCard