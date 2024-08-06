import useUser from "../../hooks/user/useUser"
import { User } from "../../types/auth"
import { TestPaper } from "../../types/testPaper"
import MyDropdownMenu from "../MyDropdownMenu"
import { FcAdvance } from 'react-icons/fc'

interface Props {
    testPaper: TestPaper
}
function TestPaperCard({ testPaper }: Props) {
    const navigate = useNavigate()
    const { getUserById, user } = useUser()
    const [testPaperOwner, setTestPaperOwner] = useState<User | null>(null)
    useEffect(() => {
        init()
    }, [])
    async function init() {
        if(user?.id === testPaper.user_id) return setTestPaperOwner(user) //是這個使用者的話，不需要多請求一次使用者資料
        const testPaperOwner = await getUserById(testPaper.user_id)
        if (testPaperOwner) setTestPaperOwner(testPaperOwner)
    }
    function goToNoteDetial() {
        navigate(`/TestPaperDetial/${testPaper.id}`)
    }
    return (
        <div className='border-black bg-white rounded-md border-2 p-3 shadow-2xl'>
            <div className="flex items-center text-xs" onClick={goToNoteDetial}>
                <p className="ml-auto mr-1 text-gray-500">查看</p>
                <FcAdvance className="cursor-pointer" size={25} />
            </div>
            <p className="my-text-overflow-3 text-sm">{testPaper.title}</p>
            <p className="my-text-overflow min-h-[20px] text-gray-600 text-xs">{testPaper.description}</p>
            <MyDropdownMenu title="options" items={[
                {
                    label: "編輯",
                    onClick: () => navigate(`EditTestPaper/${testPaper.id}`)
                },
                {
                    label: "解析",
                    onClick:()=> navigate(`TestPaperDetialWithSolution/${testPaper.id}`)
                }
            ]} />
            <p className="text-xs text-gray-500 text-right mt-1">出題者 :{testPaperOwner?.name || testPaperOwner?.id} </p>
        </div >
    )
}
export default TestPaperCard