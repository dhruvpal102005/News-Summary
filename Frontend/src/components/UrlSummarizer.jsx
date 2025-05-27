import { useState } from 'react'
import axios from 'axios'
import ArticleUrlForm from './ArticleUrlForm'

const UrlSummarizer = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUrlSubmit = async (url) => {
    setLoading(true)
    setError(null)
    setSummary(null)

    try {
      const response = await axios.post('http://localhost:5000/api/summarize-url', { url })

      if (response.data.error) {
        setError(response.data.error)
      } else {
        setSummary(response.data)
      }
    } catch (err) {
      setError("Something went wrong while fetching the summary.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ArticleUrlForm onSubmit={handleUrlSubmit} loading={loading} />

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {summary && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">{summary.title}</h2>
          <p className="text-gray-700 mb-4">{summary.summary}</p>
          <p className="text-sm">
            <strong>Sentiment:</strong> {summary.sentiment} ({summary.confidence}%)
          </p>
          <a
            href={summary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Read original article
          </a>
        </div>
      )}
    </div>
  )
}

export default UrlSummarizer
