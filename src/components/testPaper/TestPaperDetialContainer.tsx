import useTestPage from '../../hooks/testPaper/useTestPaper'
import TestPaperDetailCard from './TestPaperDetialCard'
interface Props {
    editable?:boolean,
    showAllAnswer?:boolean,
    showAllSolution?:boolean
}
function TestPaperDetailContainer({ editable, showAllAnswer, showAllSolution }: Props) {
   const { testPaperId } = useParams()
    const { 
        currentTestPaper,
        updateStoreCurrentTestPaper,
    } = useTestPage()

    useEffect(()=>{
        init()
    },[])
    async function init(){
        updateStoreCurrentTestPaper(Number(testPaperId))
    }
    return (
        <section>
            {
                currentTestPaper? 
                <TestPaperDetailCard editable={editable || false} showAllAnswer={showAllAnswer || false} showAllSolution={showAllSolution || false}  testPaper={currentTestPaper}/> : 
                <p>找不到該考卷</p>
            }
        </section>
    )
}
export default TestPaperDetailContainer