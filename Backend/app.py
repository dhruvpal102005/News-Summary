from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import summarize_articles_by_topic, summarize_article_by_url

app = Flask(__name__)
CORS(app)

@app.route("/summarize/topic")
def summarize_topic():
    topic = request.args.get("query")
    return jsonify(summarize_articles_by_topic(topic))

@app.route("/summarize/url", methods=["POST"])
def summarize_url():
    data = request.get_json()
    url = data.get("url")
    return jsonify(summarize_article_by_url(url))

if __name__ == "__main__":
    app.run(debug=True)
