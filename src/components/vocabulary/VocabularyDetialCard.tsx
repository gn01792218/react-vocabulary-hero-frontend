import { Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"
import ExampleCreateForm from "./ExampleCreateForm"
import useVocabulary from "../../hooks/vocabulary/useVocabulary"
interface Props {
    editable:boolean
    vocabulary: Vocabulary | undefined
}
function VocabularyDetailCard({ editable, vocabulary }: Props) {
    const navigate = useNavigate()
    const { deleteVocabulary } = useVocabulary()
    const [openCreateExampleForm, setOpenCreateExampleForm] = useState(false)
    async function onVocabularyDeteled(){
        if(!vocabulary) return 
        await deleteVocabulary(vocabulary?.id)
        navigate('/')
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{vocabulary?.spelling} {vocabulary?.pronunciation}</p>
                {
                    (editable && vocabulary) && 
                    <section>
                        <button className="block border-2 border-red-500" onClick={onVocabularyDeteled}>-刪除此單字</button>
                        <button className="border-2 border-green-500" onClick={()=>setOpenCreateExampleForm(!openCreateExampleForm)}>+添加解釋</button>
                    </section>
                }
                {
                    (openCreateExampleForm && vocabulary?.id) && 
                    <ExampleCreateForm vocabularyId={vocabulary?.id} onSuccess={()=>setOpenCreateExampleForm(false)}/>
                }
                <ul>
                    {
                        vocabulary?.examples.map((example,index) => {
                            return (
                                <div key={example.id}>
                                    <span>{index+1}</span>
                                    <ExampleCard editable={editable} vocabularyId={vocabulary.id} example={example} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div> 
        </div>
    )
}
export default VocabularyDetailCard