import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import { Example, Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"
import MyDropdownMenu from "../MyDropdownMenu"
import VocabularyMeta from "./VocabularyMeta"

interface Props {
    vocabulary: Vocabulary,
}
function VocabularyCard({ vocabulary }: Props) {
    const navigate = useNavigate()
    const { getVocabularyIncludeExamplesAndStences } = useVocabulary()
    const [examples, setExamples] = useState<Example[]>([])
    async function onGetExamplesAndStencesButtonClick() {
        const res = await getVocabularyIncludeExamplesAndStences(vocabulary.id)
        if (!res) return
        setExamples([...res?.examples])
    }
   
    return (
        <div className='border-white bg-red-300 border-2 p-3 rounded-md min-h-[145px]'>
            <VocabularyMeta vocabulary={vocabulary} showGoDetailIcon={true}/>
            {
                examples.length ?
                    <ul>
                        {
                            examples.map((example) => {
                                return (
                                    <ExampleCard editable={false} vocabularyId={vocabulary.id} example={example} />
                                )
                            })
                        }
                    </ul> :
                    <p className="text-xs text-gray-500">尚無解釋</p>
            }
            <MyDropdownMenu title="options" items={[
                {
                    label:'看解釋和例句',
                    onClick:onGetExamplesAndStencesButtonClick
                },
                {
                    label: "編輯",
                    onClick:()=> navigate(`EditVocabulary/${vocabulary.id}`)
                }
            ]} />
        </div>
    )
}
export default VocabularyCard