import { Example } from "../../types/vocabulary"
import SentenceCreateForm from "./StenceCreateForm"

interface Props{
    vocabularyId:number
    example:Example
    withCreateForm:boolean
}
function ExampleCard({vocabularyId,example, withCreateForm}:Props) {
        const [openCreateStenceForm, setOpenCreateStenceForm] = useState(false)
    return (
        <div className='border-red-200 border-2 p-5'>
                <p>{example.definition}</p>
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
                            <div className="py-1" key={sentence.id}>
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