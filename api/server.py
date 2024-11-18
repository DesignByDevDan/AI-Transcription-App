from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.transcript import upload_file, transcribe_audio, get_transcription
from dotenv import load_dotenv
import time
import os
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Ensure the `data/` directory exists
DATA_DIR = "data"
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

@app.route('/')
def index():
    """
    Root route that provides a basic API description.
    """
    return jsonify({
        "message": "Welcome to the Transcripto API! Use /transcribe to upload a file or provide a URL for transcription."
    })

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check route to verify that the server is running.
    """
    return jsonify({"status": "healthy"}), 200

@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        logging.info("Received transcription request")

        # Handle file uploads
        if 'file' in request.files:
            audio_file = request.files['file']
            file_path = os.path.join(DATA_DIR, audio_file.filename)

            # Save the uploaded file locally
            audio_file.save(file_path)
            logging.debug(f"File saved locally at {file_path}")

            # Upload the file and get its public URL
            audio_url = upload_file(file_path)
            if not audio_url:
                logging.error("Failed to upload the audio file")
                return jsonify({"status": "failed", "error": "Failed to upload the audio file"}), 500

        # Handle URL input
        elif 'url' in request.json:
            audio_url = request.json['url']
            if not audio_url.startswith("http"):
                logging.error("Invalid URL provided")
                return jsonify({"status": "failed", "error": "Invalid URL"}), 400

            logging.debug(f"Using audio URL: {audio_url}")

        else:
            return jsonify({"status": "failed", "error": "No file or URL provided"}), 400

        # Start transcription and get the transcription ID
        transcription_id = transcribe_audio(audio_url)
        if not transcription_id:
            logging.error("Failed to start transcription")
            return jsonify({"status": "failed", "error": "Failed to start transcription"}), 500

        logging.debug(f"Transcription started. ID: {transcription_id}")

        # Poll for transcription completion
        max_wait_time = 300  # 5 minutes timeout
        start_time = time.time()

        while True:
            transcription = get_transcription(transcription_id)

            if transcription["status"] == "completed":
                logging.info("Transcription completed successfully")
                return jsonify({"status": "completed", "text": transcription["text"]})

            if transcription["status"] == "failed":
                logging.error("Transcription failed")
                return jsonify({"status": "failed", "error": transcription.get("error", "Unknown error")})

            if time.time() - start_time > max_wait_time:
                logging.error("Transcription timed out")
                return jsonify({"status": "failed", "error": "Transcription timeout"}), 504

            time.sleep(5)  # Poll every 5 seconds

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"status": "failed", "error": str(e)}), 500
    finally:
        # Cleanup: Delete the local file after processing
        try:
            if 'file_path' in locals() and os.path.exists(file_path):
                os.remove(file_path)
                logging.debug(f"Deleted local file: {file_path}")
        except Exception as cleanup_error:
            logging.error(f"Failed to delete local file: {cleanup_error}")

if __name__ == "__main__":
    # Use the PORT environment variable for production or default to 5000
    port = int(os.environ.get("PORT", 5001))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
