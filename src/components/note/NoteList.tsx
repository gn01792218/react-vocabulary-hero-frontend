import useUser from '../../hooks/user/useUser'
import NoteCard from './NoteCard'
import { Note } from '../../types/note'
interface Props{
    notes:Note[]
}
function NoteList({notes}:Props){
    const { user } = useUser()
    
    return (
        <ul className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4'>
            {   notes.length?
                notes.filter(n=>n.userId === user?.id).map((v) => {
                    return (
                        <li key={v.id}>
                            <NoteCard note={v}/>
                        </li>
                    )
                }) :
                <p>目前還沒有任何筆記</p>
            }
        </ul>
    )
}
export default NoteList