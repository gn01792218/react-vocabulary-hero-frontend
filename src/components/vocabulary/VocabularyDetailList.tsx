import { Vocabulary } from '../../types/vocabulary'
import VocabularyDetailCard from './VocabularyDetialCard'
interface Props{
    vocabularys:Vocabulary[]
    editable:boolean
}
function VocabularyDetailList({vocabularys, editable}:Props){
    return (
        <ul >
            {   vocabularys.length?
                vocabularys.map((v) => {
                    return (
                        <li key={v.id}>
                            <VocabularyDetailCard editable={editable} vocabulary={v}/>
                        </li>
                    )
                }) :
                <p>目前還沒有任何單字</p>
            }
        </ul>
    )
}
export default VocabularyDetailList