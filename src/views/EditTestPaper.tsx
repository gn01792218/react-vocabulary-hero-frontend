import TestPaperDetailContainer from "../components/testPaper/TestPaperDetialContainer"
import useVocabulary from "../hooks/vocabulary/useVocabulary"

function EditNote() {
    const { getAllVocabularyIncludeAllRelationship } = useVocabulary()
    useEffect(()=>{
        getAllVocabularyIncludeAllRelationship()
    },[])
    return (
       <TestPaperDetailContainer editable={true}/> 
    )
}
export default EditNote