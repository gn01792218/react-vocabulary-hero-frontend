import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example } from "../../types/vocabulary"
import SentenceCreateForm from "./StenceCreateForm"

interface Props{
    vocabularyId:number
    example:Example
    editable:boolean
}
function ExampleCard({vocabularyId,example, editable: withCreateForm}:Props) {
        const [openCreateStenceForm, setOpenCreateStenceForm] = useState(false)
        const { deleteExample, deleteSentence } = useVocabulary()
    return (
        <div className='border-red-200 border-2 p-5'>
                <p>{example.definition}</p>
                {
                    withCreateForm && <button className="border-2 border-red-500" onClick={()=>deleteExample(example.id)}>-刪除此解釋</button>
                }
                {
                    withCreateForm &&
                    <section>
                        <button className="border-2 border-green-500" onClick={()=>setOpenCreateStenceForm(!openCreateStenceForm)}>+添加此解釋的例句</button>
                        {
                            (openCreateStenceForm) && 
                            <SentenceCreateForm onSuccess={()=>setOpenCreateStenceForm(false)} vocabularyId={vocabularyId} exampleId={example.id}/>
                        }
                    </section>
                }
            <ul>
                {
                    example.sentences.map((sentence)=>{
                        return (
                            <div>
                                <div className="py-1" key={sentence.id}>
                                    <p>{sentence.en}</p>
                                    <p>{sentence.zh}</p>
                                </div>
                                {
                                    withCreateForm && <button className="border-2 border-red-500" onClick={()=>deleteSentence(sentence.id)}>-刪除此例句</button>
                                }
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default ExampleCard