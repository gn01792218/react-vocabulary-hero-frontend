import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import VocabularyCard from '../../components/vocabulary/VocabularyCard'
import useUser from '../../hooks/user/useUser'

function VocabularyList(){
    const {
        vocabularys,
        getAllVocabulary
    } = useVocabulary()
    const { user } = useUser()
    useMemo(()=>{
        getAllVocabulary()
    },[user])
    return (
        <ul >
            {   vocabularys.length?
                vocabularys.filter(v=>v.userId === user?.id).map((v) => {
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