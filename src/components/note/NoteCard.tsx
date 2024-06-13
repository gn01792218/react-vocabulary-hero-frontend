import { Note } from "../../types/note"
import MyDropdownMenu from "../MyDropdownMenu"

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
            <div className="cursor-pointer py-2" onClick={goToNoteDetial}>
                <p>{note.title}</p>
                <p>{note.description}</p>
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