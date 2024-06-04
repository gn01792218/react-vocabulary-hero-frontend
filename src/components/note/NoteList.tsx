import VocabularyCard from '../vocabulary/VocabularyCard'
import useUser from '../../hooks/user/useUser'
import useNote from '../../hooks/note/useNote'
import NoteCard from './NoteCard'

function NoteList(){
    const {
        notes,
        getAllNotes
    } = useNote()
    const { user } = useUser()
    useMemo(()=>{
        getAllNotes()
    },[user])
    return (
        <ul >
            {   notes.length?
                notes.filter(n=>n.userId === user?.id).map((v) => {
                    return (
                        <li key={v.id}>
                            <NoteCard note={v}/>
                        </li>
                    )
                }) :
                <p>目前還沒有任何筆記</p>
            }
        </ul>
    )
}
export default NoteList