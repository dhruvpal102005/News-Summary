const getSentimentColor = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 'bg-sentiment-positive text-white';
    case 'negative':
      return 'bg-sentiment-negative text-white';
    case 'neutral':
    default:
      return 'bg-sentiment-neutral text-white';
  }
}

const getSentimentIcon = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'negative':
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'neutral':
    default:
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

const SentimentBadge = ({ sentiment, confidence, large = false }) => {
  const colorClass = getSentimentColor(sentiment);
  const icon = getSentimentIcon(sentiment);
  
  return (
    <div className={`badge ${colorClass} ${large ? 'text-sm px-3 py-1.5' : ''} flex items-center`}>
      {icon}
      <span className="capitalize">{sentiment}</span>
    </div>
  );
}

export default SentimentBadge;