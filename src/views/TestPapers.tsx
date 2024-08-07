import TestPaperList from "../components/testPaper/TestPaperList"
import useTestPaper from "../hooks/testPaper/useTestPaper"

function TestPapers() {
    const { testPapers } = useTestPaper()
    return (
        <div>
            <TestPaperList items={testPapers.filter(t=>t.share)}/>
        </div>
    )
}
export default TestPapers