import ImageToTextConvertor from '../components/ImageToTextConvertor'
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
            <section className='flex justify-around mb-5'>
                <NoteCreateForm />
                <VocabularyCreateForm />
            </section>
            <section className='w-[130px] ml-auto'>
                <ImageToTextConvertor />
            </section>
            <section className='mb-5'>
                <p className='text-white font-bold text-xl shadow-2xl'>我的筆記</p>
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