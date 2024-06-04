import useNote from "../../hooks/note/useNote"
import { Note } from "../../types/note"

interface Props{
    note:Note
}
function NoteCard({note}:Props) {
    const navigate = useNavigate()
    const {  } = useNote()

    function goToNoteDetial(){
        navigate(`/NoteDetial/${note.id}`)
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <div className="cursor-pointer" onClick={goToNoteDetial}>
            <p>{note.title}</p>
            <p>{note.description}</p>
            </div>
            <button className="border-2 border-green-500" onClick={()=>navigate(`EditNote/${note.id}`)}>編輯筆記</button>
        </div>
    )
}
export default NoteCard