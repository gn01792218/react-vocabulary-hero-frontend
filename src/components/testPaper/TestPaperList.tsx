import useUser from '../../hooks/user/useUser'
import TestPaperCard from './TestPaperCard'
import { TestPaper } from '../../types/testPaper'
interface Props{
    items:TestPaper[]
}
function TestPaperList({items}:Props){
    const { user } = useUser()
    
    return (
        <ul className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4'>
            {   items.length?
                items.filter(i=>(i.share && i.user_id === user?.id)).map((v) => {
                    return (
                        <li key={v.id}>
                            <TestPaperCard testPaper={v}/>
                        </li>
                    )
                }) :
                <p>目前還沒有任何考卷</p>
            }
        </ul>
    )
}
export default TestPaperList