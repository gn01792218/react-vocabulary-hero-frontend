import { TestPaper } from "../../types/testPaper"
import useTestPaper from "../../hooks/testPaper/useTestPaper"
import useUser from "../../hooks/user/useUser"
import MyVocabularyAddToNoteCheckboxList from "../vocabulary/MyVocabularyCheckboxList"
import MCQQUestionCreateForm from "../MCQ/MCQQuestionCreateForm"
import VocabularyDetailListForNote from "../vocabulary/VocabularyDetailListForNote"
import MCQQuestionList from "../MCQ/MCQQuestionList"
interface Props {
    editable:boolean
    testPage: TestPaper | undefined
}
function TestPaperDetailCard({ editable, testPage }: Props) {
    const navigate = useNavigate()
    const { deleteTestPaper } = useTestPaper()
    const { user } = useUser()

    async function onNoteDeteled(){
        if(!testPage) return 
        await deleteTestPaper(testPage?.id)
        navigate('/')
    }
    
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{testPage?.title}</p>
                <p>{testPage?.description}</p>
                {
                    (editable && testPage) && 
                    <section>
                        <button className="block border-2 border-red-500" onClick={onNoteDeteled}>-刪除此卷</button>
                    </section>
                }
                {
                    user?.id &&
                    testPage?.id && 
                    <section className="flex justify-around">
                        {/* 這裡是建立選擇題的按鈕 */}
                        <MCQQUestionCreateForm testPaperId={testPage.id}/>
                        {/* <MyVocabularyAddToNoteCheckboxList note={note} vocabularys={vocabularys.filter(v=>v.userId === user?.id)}/> */}
                    </section>
                }     
                ----------------------------------------------------------------------------------------
                {
                    testPage?.MCQs &&
                   <MCQQuestionList MCQQuestions={testPage.MCQs}/> 
                }
                 </div> 
        </div>
    )
}
export default TestPaperDetailCard