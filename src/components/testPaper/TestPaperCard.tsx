import { TestPaper } from "../../types/testPaper"
import MyDropdownMenu from "../MyDropdownMenu"
import { FcAdvance } from 'react-icons/fc'

interface Props {
    testPaper: TestPaper
}
function TestPaperCard({ testPaper }: Props) {
    const navigate = useNavigate()
    function goToNoteDetial() {
        navigate(`/TestPaperDetial/${testPaper.id}`)
    }
    return (
        <div className='border-black bg-white rounded-md border-2 p-3 shadow-2xl'>
            <div className="flex items-center text-xs" onClick={goToNoteDetial}>
                <p className="ml-auto mr-1 text-gray-500">查看</p>
                <FcAdvance className="cursor-pointer" size={25}  />
            </div>
            <p className="my-text-overflow-3 text-sm">{testPaper.title}</p>
            <p className="my-text-overflow min-h-[20px] text-gray-600 text-xs">{testPaper.description}</p>
            <MyDropdownMenu title="options" items={[
                {
                    label: "編輯",
                    onClick: () => navigate(`EditTestPaper/${testPaper.id}`)
                }
            ]} />
        </div >
    )
}
export default TestPaperCard