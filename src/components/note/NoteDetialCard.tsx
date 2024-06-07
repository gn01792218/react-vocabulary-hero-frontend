import { Note } from "../../types/note"
import useNote from "../../hooks/note/useNote"
import VocabularyCreateForm from "../vocabulary/VocabularyCreateForm"
import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import useUser from "../../hooks/user/useUser"
import VocabularyDetailList from "../vocabulary/VocabularyDetailList"
import MyVocabularyAddToNoteCheckboxList from "../vocabulary/VocabularyCheckboxList"
import VocabularyCreateFormFromNote from "../vocabulary/VocabularyCreateFormFromNote"
interface Props {
    editable:boolean
    note: Note | undefined
}
function NoteDetailCard({ editable, note }: Props) {
    const navigate = useNavigate()
    const { deleteNote } = useNote()
    const { user } = useUser()
    const { vocabularys } = useVocabulary()
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
                        <button className="border-2 border-green-500" onClick={()=>setOpenExistVocabularyList(!openExistVocabularyList)}>+看看我自己的單字</button>
                    </section>
                }
                {
                    (openCreateVocabularyForm && note?.id) && 
                    <VocabularyCreateFormFromNote noteId={note.id}/>
                }
                {
                    (openExistVocabularyList && note?.id) && 
                    <section>
                        <MyVocabularyAddToNoteCheckboxList note={note} vocabularys={vocabularys.filter(v=>v.userId === user?.id)}/>
                    </section>
                }         
                ----------------------------------------------------------------------------------------
                {
                    note?.vocabularys &&
                    <VocabularyDetailList editable={editable} vocabularys={note?.vocabularys}/>           
                }
                 </div> 
        </div>
    )
}
export default NoteDetailCard