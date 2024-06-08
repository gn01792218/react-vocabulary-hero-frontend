import useNote from "../../hooks/note/useNote"
import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example } from "../../types/vocabulary"
import SentenceCreateForm from "./StenceCreateForm"

interface Props {
    vocabularyId: number
    example: Example
    editable: boolean,
    noteId?:number
}
function ExampleCard({ vocabularyId, example, editable, noteId }: Props) {
    const [openCreateStenceForm, setOpenCreateStenceForm] = useState(false)
    const { deleteExample, deleteSentence, updateCurrentVocabulary } = useVocabulary()
    const { updateStoreCurrentNote } = useNote()
    async function onDeleteExample(){
        await deleteExample(example.id)
        if(noteId) updateStoreCurrentNote(noteId)
        else updateCurrentVocabulary()
    }
    async function onStenceCreateSuccess() {
        if(noteId) await updateStoreCurrentNote(noteId)
        else await updateCurrentVocabulary()
        setOpenCreateStenceForm(false)
    }
    async function onDeleteStence(stenceId:number){
        await deleteSentence(stenceId)
        if(noteId) await updateStoreCurrentNote(noteId)
        else updateCurrentVocabulary()
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <p>{example.definition}</p>
            {
                editable && <button className="border-2 border-red-500" onClick={onDeleteExample}>-刪除此解釋</button>
            }
            {
                editable &&
                <section>
                    <button className="border-2 border-green-500" onClick={() => setOpenCreateStenceForm(!openCreateStenceForm)}>+添加此解釋的例句</button>
                    {
                        (openCreateStenceForm) &&
                        <SentenceCreateForm vocabularyId={vocabularyId} exampleId={example.id} onCreateSuccess={onStenceCreateSuccess}/>
                    }
                </section>
            }
            <ul>
                {
                    example.sentences.map((sentence) => {
                        return (
                            <div key={sentence.id}>
                                <div className="py-1">
                                    <p>{sentence.en}</p>
                                    <p>{sentence.zh}</p>
                                </div>
                                {
                                    editable && <button className="border-2 border-red-500" onClick={()=>onDeleteStence(sentence.id)}>-刪除此例句</button>
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