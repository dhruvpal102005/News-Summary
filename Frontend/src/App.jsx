import { useState } from 'react'
import Header from './components/Header'
import InputModeToggle from './components/InputModeToggle'
import TopicSearchForm from './components/TopicSearchForm'
import ArticleUrlForm from './components/ArticleUrlForm'
import ArticleList from './components/ArticleList'
import SingleArticle from './components/SingleArticle'
import { motion } from 'framer-motion'

function App() {
  const [mode, setMode] = useState('topic') // 'topic' or 'url'
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [singleArticle, setSingleArticle] = useState(null)
  const [error, setError] = useState(null)

  const handleTopicSearch = async (topic) => {
    setLoading(true)
    setArticles([])
    setSingleArticle(null)
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      })

      const data = await response.json()
      if (data.articles) {
        setArticles(data.articles)
      } else {
        setError('No articles found for the given topic.')
      }
    } catch (error) {
      setError('Error fetching topic articles.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUrlSubmit = async (url) => {
    setLoading(true)
    setArticles([])
    setSingleArticle(null)
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      const data = await response.json()
      if (data.article) {
        setSingleArticle(data.article)
      } else {
        setError('No summary found for the provided URL.')
      }
    } catch (error) {
      setError('Error fetching article from URL.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <InputModeToggle mode={mode} setMode={setMode} />

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {mode === 'topic' ? (
              <TopicSearchForm onSearch={handleTopicSearch} loading={loading} />
            ) : (
              <ArticleUrlForm onSubmit={handleUrlSubmit} loading={loading} />
            )}
          </motion.div>
        </div>

        {error && (
          <div className="text-center py-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {articles.length > 0 && <ArticleList articles={articles} />}
            {singleArticle && <SingleArticle article={singleArticle} />}
            {!loading && articles.length === 0 && !singleArticle && !error && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">Enter a topic or URL to get started</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="py-6 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Personalized News Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
