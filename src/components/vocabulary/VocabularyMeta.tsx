import { Vocabulary } from "../../types/vocabulary"
import VocabularySpeakable from "./VocabularySpeakable"
import { FcAdvance } from 'react-icons/fc'

interface Props {
    vocabulary: Vocabulary,
    showGoDetailIcon: boolean
}
function VocabularyMeta({ vocabulary, showGoDetailIcon }: Props) {
    const navigate = useNavigate()
    function goToVocabularyDetial() {
        navigate(`/VocabularyDetial/${vocabulary.id}`)
    }
    return (
        <div className="cursor-pointer">
            {
                showGoDetailIcon &&
                <div className="flex items-center text-xs" onClick={goToVocabularyDetial}>
                    <p className="ml-auto mr-1 text-gray-500">查看</p>
                    <FcAdvance className="cursor-pointer" size={25} />
                </div>
            }
            <VocabularySpeakable text={vocabulary.spelling} pronunciation={vocabulary.pronunciation}/>
        </div>
    )
}
export default VocabularyMeta