import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example, Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"

interface Props{
    vocabulary:Vocabulary
}
function VocabularyCard({vocabulary}:Props) {
    const navigate = useNavigate()
    const { getVocabularyIncludeExamplesAndStences, deleteVocabulary } = useVocabulary()
    const [examples, setExamples] = useState<Example[]>([])
    async function onGetExamplesAndStencesButtonClick(){
        const res = await getVocabularyIncludeExamplesAndStences(vocabulary.id)
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
            <button className="block border-2 border-red-500" onClick={()=>deleteVocabulary(vocabulary.id)}>-刪除此單字</button>
            <button onClick={onGetExamplesAndStencesButtonClick} className="border-1 border-green-200">看解釋和例句</button>
            {
                examples.length?
                <ul>
                    {
                        examples.map((example)=>{
                            return (
                                <ExampleCard withCreateForm={false} vocabularyId={vocabulary.id} example={example}/>
                            )
                        })
                    }
                </ul> : 
                <p>尚無解釋</p>
            }
        </div>
    )
}
export default VocabularyCard