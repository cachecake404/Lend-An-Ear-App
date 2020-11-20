from Base64Manager import *
from google.cloud import speech_v1p1beta1 as speech
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "lendAnEarCred.json"

def detect_language_from_voice(voice_string):
    client = speech.SpeechClient()
    speech_file = decode_data(voice_string)
    audio = speech.RecognitionAudio(content=speech_file)
    first_lang = 'en-US'
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        audio_channel_count=2,
        language_code=first_lang)
    response = client.recognize(config=config, audio=audio)
    language_choice = "English"
    for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        language_choice = alternative.transcript
    return language_choice.strip()

##speech_file = "japanese.wav"
##voice_string = encode_data(speech_file)
##language_choice = detect_language_from_voice(voice_string)
##print(language_choice)
