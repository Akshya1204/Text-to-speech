from flask import Flask, render_template, request, jsonify
import pyttsx3
import os
import uuid
from gtts import gTTS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/audio'

# Ensure audio directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Function to find appropriate voice based on gender
def get_voice_by_gender(gender):
    
    if gender =="male":
        return 0
    else:
        return 1
    

def generate_voice_pyttsx3(text, gender, rate, volume,accent, filename):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    # Set voice properties
    voice_id = get_voice_by_gender(gender)
    engine.setProperty('voice', voices[voice_id].id)
    
    # Adjust speech rate (default 200)
    engine.setProperty('rate', 200 * float(rate))
    
    # Adjust volume (0-1 scale)
    engine.setProperty('volume', float(volume) / 100)
    accent_map = {
        'american': 'com',
        'british': 'co.uk',
        'australian': 'com.au',
        'canadian': 'ca',
        'indian': 'in',
        'irish': 'ie',
        'south_african': 'co.za'
    }
    tld = accent_map.get(accent.lower())
    tts = gTTS(text=text, tld=tld)


    # Save generated speech to file
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    engine.save_to_file(text, filepath)
    engine.runAndWait()



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    text = data.get('text')
    gender = data.get('gender')
    accent = data.get('accent')
    rate = data.get('rate', 1)
    volume = data.get('volume', 50)
    
    
    # Generate unique filename
    filename = f"{uuid.uuid4()}.mp3"
    
    try:
        # If gender is selected, use pyttsx3 for gender support
        if gender in ["male", "female"]:  
            generate_voice_pyttsx3(text, gender, rate, volume,accent, filename)
        
        return jsonify({
            'success': True,
            'url': f'/static/audio/{filename}',
            'text': text,
            'gender': gender,
            'accent': accent,
            'rate': rate,
            'volume': volume
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
