import { TestPaper } from "../../types/testPaper"
import useTestPaper from "../../hooks/testPaper/useTestPaper"
import useUser from "../../hooks/user/useUser"
import MCQQUestionCreateForm from "../MCQ/MCQQuestionCreateForm"
import MCQQuestionList from "../MCQ/MCQQuestionList"
import MyMCQQuestionAddToTestPaperCheckboxList from "../MCQ/MyMCQQuestionAddToTestPaperCheckboxList"
interface Props {
    editable?:boolean
    showAllAnswer?:boolean
    showAllSolution?:boolean
    testPaper: TestPaper | undefined
}
function TestPaperDetailCard({ editable, showAllAnswer, showAllSolution, testPaper }: Props) {
    const navigate = useNavigate()
    const { deleteTestPaper } = useTestPaper()
    const { user } = useUser()

    async function onNoteDeteled(){
        if(!testPaper) return 
        await deleteTestPaper(testPaper?.id)
        navigate('/')
    }
    
    return (
        <div className='border-red-200 border-2 p-5'>
            <div>
                <p>{testPaper?.title}</p>
                <p>{testPaper?.description}</p>
                {
                    (editable && testPaper) && 
                    <section>
                        <button className="block border-2 border-red-500" onClick={onNoteDeteled}>-刪除此卷</button>
                    </section>
                }
                {
                    user?.id &&
                    testPaper?.id && 
                    <section className="flex justify-around">
                        {/* 這裡是建立選擇題的按鈕 */}
                        <MCQQUestionCreateForm testPaperId={testPaper.id}/>
                        <MyMCQQuestionAddToTestPaperCheckboxList testPaper={testPaper}/>
                    </section>
                }     
                ----------------------------------------------------------------------------------------
                {
                    testPaper?.MCQs &&
                   <MCQQuestionList MCQQuestions={testPaper.MCQs} showAllAnswer={showAllAnswer || false} showAllSolution={showAllSolution || false}/> 
                }
                 </div> 
        </div>
    )
}
export default TestPaperDetailCard