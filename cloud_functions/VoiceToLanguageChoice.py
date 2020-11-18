# # voice_to_language_choice(audio) ==> RETRURNS the language choice
from Base64Manager import *
from google.cloud import speech_v1p1beta1 as speech


# #image_string = encode_image("test_image.jpg")
def detect_language_from_voice(voice_string):

    # Instantiates a client
    client = speech.SpeechClient()
    speech_file = decode_voice(voice_string)
    audio = speech.RecognitionAudio(content=speech_file)
    
    first_lang = 'en-US'

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        audio_channel_count=2,
        language_code=first_lang)
        # alternative_language_codes=[second_lang])

    print('Waiting for operation to complete...')
    response = client.recognize(config=config, audio=audio)

    for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        language_choice = alternative.transcript
        # print(u'Transcript: {}'.format(alternative.transcript))
    
    return language_choice 


speech_file = "japanese.wav"
voice_string = encode_voice(speech_file)
language_choice = detect_language_from_voice(voice_string)
print(language_choice)

# TODO: talk about hertz and first choice of language. 
