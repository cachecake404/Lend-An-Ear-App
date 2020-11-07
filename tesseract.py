from PIL import Image
import pytesseract
im = Image.open("test_image.jpg")
texts = pytesseract.image_to_string(im, lang="eng")
print(texts)