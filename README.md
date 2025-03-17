# Text-to-speech
This is a simple Text-to-Speech (TTS) Web Application that allows users to convert text into speech using pyttsx3 and Google Text-to-Speech (gTTS). The app features a web-based UI built with HTML, CSS, JavaScript, and Tailwind CSS, and a Flask backend for speech processing.

### Features
- Convert text to speech with adjustable rate & volume
- Select voice gender (Male/Female)
- Choose from different accents (Indian, American, British, etc.)
- History log of generated audio files
- Web-based UI for easy interaction

### Tech Stack
- Frontend: HTML, CSS, JavaScript, Tailwind CSS
- Backend: Python, Flask
- TTS Libraries: pyttsx3, gTTS
- Other Tools: Fetch API, UUID, Pyttsx3 voice selection

### Installation & Setup
1. Clone the Repository
bash
Copy
Edit
```
git clone https://github.com/yourusername/text-to-speech-webapp.git
cd text-to-speech-webapp
```
3. Create a Virtual Environment (Optional but Recommended)
bash
Copy
Edit
```
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```

7. Run the Application
bash
Copy
Edit
```
python app.py
The app will start running on http://127.0.0.1:5000/
```

### Usage
- Enter text into the text box.
- Select a gender and accent from the dropdowns.
- Adjust the volume and speech rate using sliders.
- Click "Convert" to generate the speech.
- Listen to the generated speech via the history section.
-  API Endpoint
- Convert Text to Speech
- Endpoint: /convert
- Method: POST
- 
Request Body (JSON):

json
Copy
Edit
```
{
  "text": "Hello, how are you?",
  "gender": "male",
  "accent": "american",
  "rate": 1,
  "volume": 50
}
Response (JSON):
```
json
Copy
Edit
```
{
  "success": true,
  "url": "/static/audio/filename.mp3",
  "text": "Hello, how are you?",
  "gender": "male",
  "accent": "american",
  "rate": 1,
  "volume": 50
}
```
```
Project Structure
📂 text-to-speech-webapp
│── 📂 static
│   ├── 📂 audio  # Stores generated audio files
│   ├── 📜 style.css  # CSS styles
│   ├── 📜 script.js  # JavaScript for frontend logic
│── 📂 templates
│   ├── 📜 index.html  # Web interface
│── 📜 app.py  # Flask backend
│── 📜 README.md  # Project documentation
```
