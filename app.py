from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key securely from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Allow CORS for development

@app.route('/api/sendToLLM', methods=['POST'])
def send_to_llm():
    if not OPENAI_API_KEY:
        return jsonify({"error": "OpenAI API key not found"}), 500

    data = request.get_json()  # Get JSON from the frontend
    prompt = data.get('prompt')  # Extract prompt from request

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # Make the API request to OpenAI
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5-turbo",  # Specify the model
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 300,  # Adjust token limit
                "temperature": 0.7  # Adjust creativity
            }
        )

        # Handle API response
        response.raise_for_status()
        return jsonify(response.json())  # Return API response to frontend

    except requests.exceptions.RequestException as e:
        # Handle API errors
        return jsonify({"error": "API request failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
