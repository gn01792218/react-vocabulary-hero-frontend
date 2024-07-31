import useMCQ from '../../hooks/MCQ/useMCQ'
import { TestPaper } from '../../types/testPaper'

import { MCQQuestion } from '../../types/MCQ'
import MyButton from '../MyButton'
import MyCheckbox from '../MyCheckbox'
import MyModal from '../MyModal'
interface Props {
    testPaper: TestPaper,
}
function MyMCQQuestionAddToTestPaperCheckboxList({ testPaper }: Props) {
    const { addMCQQuestionToTestPaper, getAll, MCQs } = useMCQ()
    const [checkedList, setCheckedList] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getAll()
    }, [])
    async function onSubmit() {
        await addMCQQuestionToTestPaper(testPaper, { ids: checkedList })
        //更新MCQs
        getAll()
    }
    function onVocabularyChecked(id: number) {
        setCheckedList([...Array.from(new Set<number>(checkedList).add(id))])
    }
    function onVocabularyDisChecked(id: number) {
        const newArray = checkedList.filter(checkedId => checkedId !== id)
        setCheckedList([...newArray])
    }
    function getUnPickItem(list: MCQQuestion[]) {
        return list.filter(i => {
            return i.test_papers?.every(t => t.id !== testPaper.id && i.share)
        })
    }
    return (
        <>
            <MyModal open={open} backdrop={true} title='從選擇題庫挑選試題' onClose={() => setOpen(false)}>
                <ul >
                    {MCQs.length ?
                        getUnPickItem(MCQs).map((i) => {
                            return (
                                <li className='w-full flex items-start mb-2' key={i.id}>
                                    <div>
                                        <p>{i.question}</p>
                                        <p>{i.options.map(o => o.content).join(`/`)}</p>
                                    </div>
                                    <MyCheckbox className='ml-auto'
                                        onChecked={() => onVocabularyChecked(i.id)}
                                        onDisChecked={() => onVocabularyDisChecked(i.id)} />
                                </li>
                            )
                        }) :
                        <p>目前還沒有任何選擇題</p>
                    }
                </ul>
                <button onClick={onSubmit}>加進此試卷</button>
            </MyModal>
            <MyButton label='+從選擇題庫挑選' style='bg-green-200' onClick={() => setOpen(true)} />
        </>
    )
}
export default MyMCQQuestionAddToTestPaperCheckboxList