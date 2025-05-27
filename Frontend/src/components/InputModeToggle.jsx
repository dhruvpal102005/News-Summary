import { motion } from 'framer-motion'

const InputModeToggle = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 p-1.5 rounded-xl inline-flex shadow-lg">
        <button
          onClick={() => setMode('topic')}
          className={`btn relative px-8 py-3 rounded-lg ${
            mode === 'topic'
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {mode === 'topic' && (
            <motion.div
              layoutId="toggleBg"
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Topic Search
          </span>
        </button>
        
        <button
          onClick={() => setMode('url')}
          className={`btn relative px-8 py-3 rounded-lg ${
            mode === 'url'
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {mode === 'url' && (
            <motion.div
              layoutId="toggleBg"
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Article URL
          </span>
        </button>
      </div>
    </div>
  )
}

export default InputModeToggle