import NoteCreateForm from '../components/note/NoteCreatForm'
import NoteList from '../components/note/NoteList'
import VocabularyCreateForm from '../components/vocabulary/VocabularyCreateForm'
import VocabularyList from '../components/vocabulary/VocabularyList'
import useNote from '../hooks/note/useNote'
import useUser from '../hooks/user/useUser'
import useVocabulary from '../hooks/vocabulary/useVocabulary'
function Home() {
    const { user } = useUser()
    const {
        vocabularys,
        getAllVocabularyIncludeExample,
    } = useVocabulary()
    const {
        notes,
        getAllNotes
    } = useNote()
    useMemo(() => {
        getAllNotes()
        getAllVocabularyIncludeExample()
    }, [user])
    return (
        <div className=''>
            <h1>歡迎來到單字救星</h1>
            <section className='w-[200px] flex justify-around'>
                <NoteCreateForm />
                <VocabularyCreateForm />
            </section>
            <section>
                我的筆記
                <NoteList notes={notes} />
            </section>
            <section>
                我的單字
                <VocabularyList vocabularys={vocabularys.filter(v => v.userId === user?.id)} />
            </section>
        </div>
    )
}
export default Home