from Base64Manager import *
from google.cloud import vision
import os

#image_string = encode_image("test_image.jpg")
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "lendAnEarCred.json"

def convert_image_to_text(image_string):
    # Instantiates a client
    client = vision.ImageAnnotatorClient()
    image_file = decode_image(image_string)
    image = vision.Image(content=image_file)

    # Performs label detection on the image file
    response = client.text_detection(image=image)
    texts = response.text_annotations
    return texts[0].description

