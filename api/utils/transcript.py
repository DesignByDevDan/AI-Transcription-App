import requests
import os

def upload_file(file_path):
    """
    Uploads an audio file to AssemblyAI's storage service.
    Args:
        file_path (str): Path to the local audio file.
    Returns:
        str: The public URL of the uploaded file.
    """
    api_key = os.getenv("ASSEMBLYAI_API_KEY")  # Load API key from environment variables
    headers = {"authorization": api_key}

    with open(file_path, "rb") as audio_file:
        response = requests.post(
            "https://api.assemblyai.com/v2/upload",
            headers=headers,
            files={"file": audio_file}
        )

    if response.status_code == 200:
        return response.json()["upload_url"]  # Public URL for the uploaded file
    else:
        raise Exception(f"Failed to upload file: {response.text}")


def transcribe_audio(audio_url):
    """
    Starts the transcription process for an uploaded audio file.
    Args:
        audio_url (str): The public URL of the audio file.
    Returns:
        str: The ID of the transcription task.
    """
    api_key = os.getenv("ASSEMBLYAI_API_KEY")  # Load API key from environment variables
    headers = {"authorization": api_key, "content-type": "application/json"}

    data = {
        "audio_url": audio_url,
        "language_code": "en",  # Set language code if needed
    }

    response = requests.post(
        "https://api.assemblyai.com/v2/transcript",
        headers=headers,
        json=data
    )

    if response.status_code == 200:
        return response.json()["id"]  # Transcription task ID
    else:
        raise Exception(f"Failed to start transcription: {response.text}")


def get_transcription(transcription_id):
    """
    Polls the transcription result for a given transcription ID.
    Args:
        transcription_id (str): The ID of the transcription task.
    Returns:
        dict: The transcription result.
    """
    api_key = os.getenv("ASSEMBLYAI_API_KEY")  # Load API key from environment variables
    headers = {"authorization": api_key}

    response = requests.get(
        f"https://api.assemblyai.com/v2/transcript/{transcription_id}",
        headers=headers
    )

    if response.status_code == 200:
        return response.json()  # Transcription result
    else:
        raise Exception(f"Failed to fetch transcription: {response.text}")

