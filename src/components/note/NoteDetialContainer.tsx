import useNote from '../../hooks/note/useNote'
import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import NoteDetailCard from './NoteDetialCard'
interface Props {
    editable:boolean
}
function NoteDetailContainer({ editable }: Props) {
   const { noteId } = useParams()
    const { 
        currentNote,
        updateStoreCurrentNote,
    } = useNote()
    const { getAllVocabularyIncludeExample } = useVocabulary()

    useEffect(()=>{
        init()
    },[])
    async function init(){
        updateStoreCurrentNote(Number(noteId))
        getAllVocabularyIncludeExample()
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