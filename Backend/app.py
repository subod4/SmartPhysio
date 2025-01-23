from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins (update for production)

# Configure Gemini API
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set.")
genai.configure(api_key=gemini_api_key)

# List of full-body physiotherapy exercises and their descriptions
exercise_details = {
    'Push-ups': 'An exercise to strengthen the upper body, particularly the chest and triceps.',
    'Squats': 'A lower body exercise that targets the thighs, hips, and buttocks.',
    'Lunges': 'An exercise focusing on the legs, enhancing strength and balance.',
    'Plank': 'A core-strengthening exercise that also works the shoulders and back.',
    'Bridges': 'Targets the glutes and lower back while improving core stability.',
    'Clamshells': 'Strengthens the hip muscles and improves hip stability.',
    'Bird Dogs': 'Enhances balance and coordination while working on core stability.',
    'Dead Bugs': 'Strengthens the core while focusing on coordination between limbs.',
    'Shoulder Press': 'An exercise to build shoulder and upper arm strength.',
    'Bicep Curls': 'Strengthens the biceps and improves arm aesthetics.',
    'Tricep Dips': 'Targets the triceps, helping to tone and strengthen the arms.',
    'Calf Raises': 'Focuses on strengthening the calf muscles.',
    'Seated Row': 'Targets the back muscles, improving posture and strength.',
    'Wall Angels': 'Improves shoulder mobility and posture.',
    'Chest Stretch': 'A flexibility exercise for the chest and shoulders.',
    'Hamstring Stretch': 'Stretches the hamstring muscles to enhance flexibility.',
    'Quadriceps Stretch': 'Stretches the quadriceps for improved flexibility.',
    'Hip Flexor Stretch': 'Stretches the hip flexors to improve range of motion.',
    'Spinal Twist': 'Enhances spinal mobility and flexibility.',
    'Side Lunges': 'Strengthens the inner thighs and improves balance.',
    'Glute Bridges': 'Focuses on the glutes and lower back for better stability.',
    'Mountain Climbers': 'A full-body exercise that increases heart rate and builds endurance.',
    'Leg Raises': 'Strengthens the lower abdominal muscles.',
    'Standing Balance': 'Improves balance and stability through weight shifting.',
    'Side Plank': 'Strengthens the oblique muscles and stabilizes the core.',
    'Torso Rotation': 'Enhances core flexibility and stability.',
    'Wrist Flexor Stretch': 'Stretches the wrist and forearm muscles.',
    'Ankle Circles': 'Improves ankle mobility and flexibility.',
    'T-Pose Exercise': 'Strengthens the upper back and shoulders.',
    'Knee to Chest Stretch': 'Stretches the lower back and glutes.',
    'Pigeon Pose': 'A yoga pose that stretches the hips and glutes.'
}

@app.route('/api/suggest-exercises', methods=['POST'])
def suggest_exercises():
    try:
        data = request.json
        print("Received data:", data)  # Log incoming data
        if not data or 'message' not in data or 'user_id' not in data:
            return jsonify({"error": "Invalid input"}), 400

        user_message = data['message']
        injury_type = data.get('injuryType', '')
        duration = data.get('duration', '')
        severity = data.get('severity', '')

        # Prepare the prompt for Gemini
        prompt = (
            f"The user has reported the following injury: '{injury_type}'. "
            f"They have had it for {duration} and describe the severity as {severity}. "
            f"Additional details: '{user_message}'. "
            f"Based on this, recommend exactly two to four suitable physiotherapy exercises from the following list: "
            f"{', '.join(exercise_details.keys())}. "
            "Please list the exercises along with their descriptions in the format: "
            "'exercise name': 'description'. "
            "Do not include any additional text or explanations."
        )
        print("Generated prompt:", prompt)  # Log the prompt

        # Call the Gemini API
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        print("Gemini API response:", response.text)  # Log the response

        # Extract the recommended exercises
        recommended_exercises = []
        for line in response.text.splitlines():
            if ':' in line:
                name, description = line.split(':', 1)
                recommended_exercises.append({
                    "name": name.strip().strip("'"),
                    "description": description.strip().strip("'")
                })

        return jsonify({
            "exercises": recommended_exercises
        })

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the full error
        return jsonify({"error": "An unexpected error occurred."}), 500

# Run the app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)