import NoteDetailContainer from "../components/note/NoteDetialContainer"
import useVocabulary from "../hooks/vocabulary/useVocabulary"

function EditNote() {
    const { getAllVocabularyIncludeAllRelationship } = useVocabulary()
    useEffect(()=>{
        getAllVocabularyIncludeAllRelationship()
    },[])
    return (
       <NoteDetailContainer editable={true}/> 
    )
}
export default EditNote