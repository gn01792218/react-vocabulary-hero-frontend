import useNote from '../../hooks/note/useNote'
import useVocabulary from '../../hooks/vocabulary/useVocabulary'
import { Note } from '../../types/note'
import { Vocabulary } from '../../types/vocabulary'
import MyButton from '../MyButton'
import MyCheckbox from '../MyCheckbox'
import MyModal from '../MyModal'
interface Props {
    note: Note,
    vocabularys: Vocabulary[],
}
function MyVocabularyAddToNoteCheckboxList({ note, vocabularys }: Props) {
    const { addVocabularyToNote } = useNote()
    const { getAllVocabularyIncludeAllRelationship } = useVocabulary()
    const [checkedList, setCheckedList] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    async function onSubmit() {
        await addVocabularyToNote(note, { vocabularys_id: checkedList })
        //更新vocabularys
        getAllVocabularyIncludeAllRelationship()
    }
    function onVocabularyChecked(id: number) {
        setCheckedList([...Array.from(new Set<number>(checkedList).add(id))])
    }
    function onVocabularyDisChecked(id: number) {
        const newArray = checkedList.filter(checkedId => checkedId !== id)
        setCheckedList([...newArray])
    }
    function getUnAddToThisNoteVacabulary(vocabularyList: Vocabulary[]) {
        return vocabularyList.filter(v => {
            return v.notes?.some(n => n.id !== note.id) || !v.notes?.length
        })
    }
    return (
        <>
            <MyModal open={open} backdrop={true} title='添加我的單字到筆記本內' onClose={()=>setOpen(false)}>
                <ul >
                    {vocabularys.length ?
                        getUnAddToThisNoteVacabulary(vocabularys).map((v) => {
                            return (
                                <li className='w-[25px]' key={v.id}>
                                    <MyCheckbox
                                        label={v.spelling}
                                        description=''
                                        onChecked={() => onVocabularyChecked(v.id)}
                                        onDisChecked={() => onVocabularyDisChecked(v.id)} />
                                </li>
                            )
                        }) :
                        <p>目前還沒有任何單字</p>
                    }
                </ul>
                <button onClick={onSubmit}>加進此筆記內</button>
            </MyModal>
            <MyButton label='+入已有單字' style='bg-green-200' onClick={()=>setOpen(true)}/>
        </>
    )
}
export default MyVocabularyAddToNoteCheckboxList