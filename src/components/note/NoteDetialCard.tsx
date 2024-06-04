import { Note } from "../../types/note"
import useNote from "../../hooks/note/useNote"
import VocabularyCreateForm from "../vocabulary/VocabularyCreateForm"
import VocabularyList from "../vocabulary/VocabularyList"
interface Props {
    editable:boolean
    note: Note | undefined
}
function NoteDetailCard({ editable, note }: Props) {
    const navigate = useNavigate()
    const { deleteNote } = useNote()
    const [openCreateVocabularyForm, setOpenCreateVocabularyForm] = useState(false)
    const [openExistVocabularyList, setOpenExistVocabularyList] = useState(false)
    async function onNoteDeteled(){
        if(!note) return 
        await deleteNote(note?.id)
        navigate('/')
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{note?.title}</p>
                <p>{note?.description}</p>
                {
                    (editable && note) && 
                    <section>
                        <button className="block border-2 border-red-500" onClick={onNoteDeteled}>-刪除此筆記</button>
                        <button className="border-2 border-green-500" onClick={()=>setOpenCreateVocabularyForm(!openCreateVocabularyForm)}>+添加單字</button>
                        <button className="border-2 border-green-500" onClick={()=>setOpenExistVocabularyList(!openExistVocabularyList)}>+添加已有的單字</button>
                    </section>
                }
                {
                    (openCreateVocabularyForm && note?.id) && 
                    <VocabularyCreateForm />
                }
                {
                    (openExistVocabularyList && note?.id) && 
                    <section>
                        <VocabularyList/>
                    </section>
                }
                <ul>
                    {
                        note?.vocabularys.map((example,index) => {
                            return (
                                <div key={example.id}>
                                    <span>{index+1}</span>
                                    {/* <ExampleCard editable={editable} vocabularyId={note.id} example={example} /> */}
                                </div>
                            )
                        })
                    }
                </ul>
            </div> 
        </div>
    )
}
export default NoteDetailCard