import useNote from '../../hooks/note/useNote'
import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import { Vocabulary } from '../../types/vocabulary'
import VocabularyDetailCard from './VocabularyDetialCard'
interface Props{
    vocabularys:Vocabulary[]
    editable:boolean,
    noteId:number
}
function VocabularyDetailList({vocabularys, editable, noteId}:Props){
    const { removeVocabularyFromNote } = useNote()
    const { getAllVocabularyIncludeAllRelationship } = useVocabulary()
    async function handleRemoveVocabularyFromNote (vocabularyId:number) {
        await removeVocabularyFromNote(noteId, vocabularyId)
        getAllVocabularyIncludeAllRelationship()
    }
    return (
        <ul >
            {   vocabularys.length?
                vocabularys.map((v) => {
                    return (
                        <li key={v.id}>
                            <VocabularyDetailCard editable={editable} vocabulary={v}/>
                            {
                                (noteId && editable) && 
                                <div>
                                    <button className='border-2 bg-yellow-700' onClick={()=>handleRemoveVocabularyFromNote(v.id)}>從此note移除</button>
                                </div>
                            }
                        </li>
                    )
                }) :
                <p>目前還沒有任何單字</p>
            }
        </ul>
    )
}
export default VocabularyDetailList