import VocabularyDetailCard from '../components/vocabulary/VocabularyDetialCard'
import useVocabulary from '../hooks/vocabulary/useVocabulary'
import { Vocabulary } from '../types/vocabulary'
function VocabularyDetail() {
    const { vocabularyId } = useParams()
    const [vocabulary, setVocabulary] = useState<Vocabulary>()
    const { 
        getExamplesAndStences
    } = useVocabulary()

    useEffect(()=>{
        init()
    },[])

    async function init(){
        const vocabulary = await getExamplesAndStences(Number(vocabularyId))
        setVocabulary({...vocabulary})
    }
    return (
        <section>
            {
                vocabulary? 
                <VocabularyDetailCard vocabulary={vocabulary}/> : 
                <p>找不到該字卡</p>
            }
        </section>
    )
}
export default VocabularyDetail