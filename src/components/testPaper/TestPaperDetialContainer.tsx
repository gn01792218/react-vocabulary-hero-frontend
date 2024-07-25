import useTestPage from '../../hooks/testPaper/useTestPaper'
import TestPaperDetailCard from './TestPaperDetialCard'
interface Props {
    editable:boolean
}
function TestPaperDetailContainer({ editable }: Props) {
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
                <TestPaperDetailCard editable={editable} testPage={currentTestPaper}/> : 
                <p>找不到該考卷</p>
            }
        </section>
    )
}
export default TestPaperDetailContainer