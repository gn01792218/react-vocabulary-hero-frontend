import { current } from '@reduxjs/toolkit'
import VocabularyDetailCard from '../components/vocabulary/VocabularyDetialCard'
import useVocabulary from '../hooks/vocabulary/useVocabulary'
import { useAppDispatch } from '../store/hooks'
import { setCurrentVocabulary } from '../store/vocabularySlice'

function VocabularyDetail() {
    const { vocabularyId } = useParams()
    const dispatch = useAppDispatch()
    const { 
        currentVocabulary,
        getExamplesAndStences
    } = useVocabulary()

    useEffect(()=>{
        init()
    },[])

    async function init(){
        const vocabulary = await getExamplesAndStences(Number(vocabularyId))
        dispatch(setCurrentVocabulary({...vocabulary}))
    }
    return (
        <section>
            {
                currentVocabulary? 
                <VocabularyDetailCard vocabulary={currentVocabulary}/> : 
                <p>找不到該字卡</p>
            }
        </section>
    )
}
export default VocabularyDetail