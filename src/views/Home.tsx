import VocabularyCreateForm from '../components/vocabulary/VocabularyCreateForm'
import VocabularyList from '../components/vocabulary/VocabularyList'
function Home() {
    return (
        <div className=''>
            <h1>歡迎來到單字救星</h1>
            <VocabularyCreateForm/>
            <section>
                我的單字
                <VocabularyList/>  
            </section>
        </div>
    )
}
export default Home