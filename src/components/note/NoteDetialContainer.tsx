import useNote from '../../hooks/note/useNote'
import NoteDetailCard from './NoteDetialCard'
interface Props {
    editable:boolean
}
function NoteDetailContainer({ editable }: Props) {
   const { noteId } = useParams()
    const { 
        currentNote,
        getNote
    } = useNote()

    useEffect(()=>{
        init()
    },[])
    async function init(){
        console.log('初始化此筆記')
        getNote(Number(noteId))
    }
    return (
        <section>
            {
                currentNote? 
                <NoteDetailCard editable={editable} note={currentNote}/> : 
                <p>找不到該筆記</p>
            }
        </section>
    )
}
export default NoteDetailContainer