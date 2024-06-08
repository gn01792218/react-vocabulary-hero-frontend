import { Note } from "../../types/note"
import useNote from "../../hooks/note/useNote"
import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import useUser from "../../hooks/user/useUser"
import MyVocabularyAddToNoteCheckboxList from "../vocabulary/MyVocabularyCheckboxList"
import VocabularyCreateFormFromNote from "../vocabulary/VocabularyCreateFormFromNote"
import VocabularyDetailListForNote from "../vocabulary/VocabularyDetailListForNote"
interface Props {
    editable:boolean
    note: Note | undefined
}
function NoteDetailCard({ editable, note }: Props) {
    const navigate = useNavigate()
    const { deleteNote } = useNote()
    const { user } = useUser()
    const { vocabularys } = useVocabulary()

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
                    </section>
                }
                {
                    note?.id && 
                    <section>
                        <VocabularyCreateFormFromNote noteId={note.id}/>
                        <MyVocabularyAddToNoteCheckboxList note={note} vocabularys={vocabularys.filter(v=>v.userId === user?.id)}/>
                    </section>
                }     
                ----------------------------------------------------------------------------------------
                {
                    note?.vocabularys &&
                    <VocabularyDetailListForNote noteId={note.id} editable={editable} vocabularys={note?.vocabularys}/>           
                }
                 </div> 
        </div>
    )
}
export default NoteDetailCard