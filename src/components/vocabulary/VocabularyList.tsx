import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import VocabularyCard from '../../components/vocabulary/VocabularyCard'
import { Vocabulary } from '../../types/vocabulary'
interface Props{
    vocabularys:Vocabulary[]
}
function VocabularyList({vocabularys}:Props){
    return (
        <ul >
            {   vocabularys.length?
                vocabularys.map((v) => {
                    return (
                        <li key={v.id}>
                            <VocabularyCard  vocabulary={v} />
                        </li>
                    )
                }) :
                <p>目前還沒有任何單字</p>
            }
        </ul>
    )
}
export default VocabularyList