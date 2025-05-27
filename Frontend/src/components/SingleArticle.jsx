import { motion } from 'framer-motion'
import SentimentBadge from './SentimentBadge'

const SingleArticle = ({ article }) => {
  const { title, summary, url, sentiment, confidence } = article
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
          <SentimentBadge sentiment={sentiment} confidence={confidence} large />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {summary}
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center"
          >
            <span>Visit Original Article</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span className="font-medium mr-2">Confidence Score:</span>
              <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span className="ml-2">{confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SingleArticle