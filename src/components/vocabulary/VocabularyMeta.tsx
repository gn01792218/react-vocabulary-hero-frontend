import { Vocabulary } from "../../types/vocabulary"
import Speakable from "../Speakable"
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
        <div className="cursor-pointer flex">
            <Speakable text={vocabulary.spelling} />
            <p className="mr-2">{vocabulary.pronunciation}</p>
            {
                showGoDetailIcon &&
                <FcAdvance className="mr-5 ml-auto" size={25} onClick={goToVocabularyDetial} />
            }
        </div>
    )
}
export default VocabularyMeta