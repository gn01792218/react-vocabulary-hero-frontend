import { Vocabulary } from "../../types/vocabulary"
import ExampleCard from "./ExampleCard"
import ExampleCreateForm from "./ExampleCreateForm"
import useVocabulary from "../../hooks/vocabulary/useVocabulary"
import useNote from "../../hooks/note/useNote"
import VocabularyMeta from "./VocabularyMeta"
interface Props {
    editable: boolean
    vocabulary: Vocabulary | undefined
}
function VocabularyDetailCardForNote({ editable, vocabulary }: Props) {
    const { deleteVocabulary } = useVocabulary()
    const { currentNote, updateStoreCurrentNote } = useNote()
    const [openCreateExampleForm, setOpenCreateExampleForm] = useState(false)
    async function onExampleCreateSuccess() {
        if (!vocabulary) return
        if (!currentNote?.id) return console.log('current Note 遺失 id')
        updateStoreCurrentNote(currentNote.id)
        setOpenCreateExampleForm(false)
    }
    async function onVocabularyDeteled() {
        if (!vocabulary || !currentNote?.id) return
        await deleteVocabulary(vocabulary?.id)
        await updateStoreCurrentNote(currentNote.id)
    }
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                {
                    vocabulary &&
                    <VocabularyMeta vocabulary={vocabulary} />
                }
                {
                    (editable && vocabulary) &&
                    <section>
                        <button className="block border-2 border-red-500" onClick={onVocabularyDeteled}>-刪除此單字</button>
                        <button className="border-2 border-green-500" onClick={() => setOpenCreateExampleForm(!openCreateExampleForm)}>+添加解釋</button>
                    </section>
                }
                {
                    (openCreateExampleForm && vocabulary?.id) &&
                    <ExampleCreateForm vocabularyId={vocabulary.id} onCreateSuccess={onExampleCreateSuccess} />
                }
                <ul>
                    {
                        vocabulary?.examples &&
                        vocabulary?.examples.map((example, index) => {
                            return (
                                <div key={example.id}>
                                    <span>{index + 1}</span>
                                    <ExampleCard noteId={currentNote?.id} editable={editable} vocabularyId={vocabulary.id} example={example} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default VocabularyDetailCardForNote