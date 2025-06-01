import os
import requests
from bs4 import BeautifulSoup
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# Load summarizer and sentiment analyzer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis")

def summarize_articles_by_topic(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&language=en&apiKey={NEWS_API_KEY}"
    try:
        response = requests.get(url).json()
        articles = response.get("articles", [])[:5]  # Limit to top 5
        result = []

        for article in articles:
            title = article.get("title")
            link = article.get("url")
            if not link:
                print(f"⚠️ Skipping article with no URL: {title}")
                continue

            try:
                # Fetch full page HTML
                html = requests.get(link, timeout=10).text
                soup = BeautifulSoup(html, 'html.parser')
                paragraphs = soup.find_all('p')
                text = ' '.join(p.get_text() for p in paragraphs)
                content = text[:2048]  # summarizer input length cap

                if not content or len(content) < 200:
                    print(f"⚠️ Skipping: Insufficient content for article: {title}")
                    continue

                summary = summarizer(content)[0]['summary_text']
                sentiment = sentiment_analyzer(summary)[0]

                result.append({
                    "title": title,
                    "url": link,
                    "summary": summary,
                    "sentiment": sentiment['label'].lower(),
                    "confidence": round(sentiment['score'] * 100, 2)
                })

            except Exception as e:
                print(f"❌ Summarization failed for '{title}': {e}")
                continue

        if not result:
            return [{"error": "No valid articles found for summarization"}]
        return result

    except Exception as e:
        print(f"❌ Error fetching articles: {e}")
        return [{"error": "Failed to fetch articles from News API"}]


def summarize_article_by_url(url):
    try:
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')
        paragraphs = soup.find_all('p')
        text = ' '.join(p.get_text() for p in paragraphs)
        content = text[:2048]

        if not content:
            return {"error": "No readable content found on the page"}

        summary = summarizer(content)[0]['summary_text']
        sentiment = sentiment_analyzer(summary)[0]

        return {
            "title": soup.title.string.strip() if soup.title else "No title",
            "summary": summary,
            "sentiment": sentiment['label'].lower(),
            "confidence": round(sentiment['score'] * 100, 2)
        }

    except Exception as e:
        print(f"❌ Error summarizing article from URL: {e}")
        return {"error": "Failed to process article from URL"}
