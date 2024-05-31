import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import VocabularyCard from '../../components/vocabulary/VocabularyCard'
interface Props {
    editable:boolean
}
function VocabularyList({editable}:Props){
    const {
        vocabularys
    } = useVocabulary()
    return (
        <ul>
            {   vocabularys.length?
                vocabularys.map((v) => {
                    return (
                        <li>
                            <VocabularyCard editable={editable} vocabulary={v} />
                        </li>
                    )
                }) :
                <p>目前還沒有任何單字</p>
            }
        </ul>
    )
}
export default VocabularyList