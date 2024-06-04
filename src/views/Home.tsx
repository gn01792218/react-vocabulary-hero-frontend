import NoteCreateForm from '../components/note/NoteCreatForm'
import NoteList from '../components/note/NoteList'
import VocabularyCreateForm from '../components/vocabulary/VocabularyCreateForm'
import VocabularyList from '../components/vocabulary/VocabularyList'
function Home() {
    return (
        <div className=''>
            <h1>歡迎來到單字救星</h1>
            <NoteCreateForm/>
            <VocabularyCreateForm/>
            <section>
                我的筆記
                <NoteList/>  
            </section>
            <section>
                我的單字
                <VocabularyList/>  
            </section>
        </div>
    )
}
export default Home