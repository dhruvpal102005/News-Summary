import { motion } from 'framer-motion'
import SentimentBadge from './SentimentBadge'

const ArticleCard = ({ article }) => {
  const { title, summary, url, sentiment, confidence } = article
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4 }}
      className="card"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <SentimentBadge sentiment={sentiment} confidence={confidence} />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {summary}
        </p>
        
        <div className="flex justify-between items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center transition-colors"
          >
            Read full article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="text-sm text-gray-500 dark:text-gray-500">
            Confidence: {confidence}%
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleCard