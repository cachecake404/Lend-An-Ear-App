import base64


def encode_image(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode()
        return encoded_string

def decode_image(base64str):
    imgdata = base64.b64decode(base64str)
    return imgdata

##import pyperclip
##pyperclip.copy(encode_image("test_image.jpg"))


