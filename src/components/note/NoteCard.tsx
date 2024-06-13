import { Note } from "../../types/note"
import MyDropdownMenu from "../MyDropdownMenu"
import { FcAdvance } from 'react-icons/fc'

interface Props {
    note: Note
}
function NoteCard({ note }: Props) {
    const navigate = useNavigate()
    function goToNoteDetial() {
        navigate(`/NoteDetial/${note.id}`)
    }
    return (
        <div className='border-black bg-white rounded-md border-2 p-5 shadow-2xl'>
            <div className="cursor-pointer py-2 flex" >
                <p>{note.title}</p>
                <p>{note.description}</p>
                <FcAdvance className="mr-5 ml-auto" size={25} onClick={goToNoteDetial}/>
            </div>
            <MyDropdownMenu title="options" items={[
                {
                    label: "編輯",
                    onClick:()=> navigate(`EditNote/${note.id}`)
                }
            ]} />
        </div >
    )
}
export default NoteCard