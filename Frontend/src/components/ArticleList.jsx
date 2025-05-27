import { motion } from 'framer-motion'
import ArticleCard from './ArticleCard'

const ArticleList = ({ articles }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Found {articles.length} article{articles.length !== 1 && 's'}
      </h2>
      
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </motion.div>
  )
}

export default ArticleList