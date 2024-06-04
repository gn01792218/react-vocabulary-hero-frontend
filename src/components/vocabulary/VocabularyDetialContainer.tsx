import VocabularyDetailCard from '../../components/vocabulary/VocabularyDetialCard'
import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import { useAppDispatch } from '../../store/hooks'
import { setCurrentVocabulary } from '../../store/vocabularySlice'
interface Props {
    editable:boolean
}
function VocabularyDetailContainer({ editable }: Props) {
   const { vocabularyId } = useParams()
    const dispatch = useAppDispatch()
    const { 
        currentVocabulary,
        getVocabularyIncludeExamplesAndStences
    } = useVocabulary()

    useEffect(()=>{
        init()
    },[])
    async function init(){
        const vocabulary = await getVocabularyIncludeExamplesAndStences(Number(vocabularyId))
        if(vocabulary) dispatch(setCurrentVocabulary({...vocabulary}))
    }
    return (
        <section>
            {
                currentVocabulary? 
                <VocabularyDetailCard editable={editable} vocabulary={currentVocabulary}/> : 
                <p>找不到該字卡</p>
            }
        </section>
    )
}
export default VocabularyDetailContainer