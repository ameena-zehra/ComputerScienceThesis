from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from openai import OpenAI
import os
import re
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for all routes
client = OpenAI()
API_KEY = os.getenv('OPENAI_API_KEY')
API_URL = "https://api.openai.com/v1/chat/completions"

@app.route('/generate', methods=['POST'])
def generate_story():
    print("call has been made")
    data = request.json
    user_input = data['input']
    # Generate the story based on user input
    story_prompt = f"\nGenerate a 5-page children's book on the following topic: {user_input} Include a title at the beginning that is creative and unique and also relates to the story. Each page should be atleast 100 words, descriptive but suitable for a children's book.  Ensure the story has a clear plot that relates to the given topic, includes engaging characters, and is written in a whimsical and playful tone. The book should start with an introduction of the main character and setting, followed by an adventure or challenge, and conclude with a happy ending. "
    story_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": story_prompt}],
    )
    print(story_response)
    content = story_response.choices[0].message.content
    # Generate a title page based on the story content
    image_prompt = f"Illustrate a title page for this story line. Ensure that the title cover vividly captures the essence of the story and narration. There should be no text in the image.  {content}"
    image_response = client.images.generate(
        model="dall-e-3",
        prompt=image_prompt,
        quality="standard",
        n=1,
    )
    title_image_url = image_response.data[0].url
    return jsonify({'story': content, 'image': title_image_url})

if __name__ == '__main__':
    app.run(debug=True)
