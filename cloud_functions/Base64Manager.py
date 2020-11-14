import base64


def encode_image(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode()
        return encoded_string

def decode_image(base64str):
    imgdata = base64.b64decode(base64str)
    return imgdata

def encode_voice(audio):
    with open(audio, 'rb') as audio_file:
        audio_content = base64.b64encode(audio_file.read()).decode()
    return audio_content

def decode_voice(base64str):
    voicedata = base64.b64decode(base64str)
    return voicedata

##import pyperclip
##pyperclip.copy(encode_image("test_image.jpg"))


