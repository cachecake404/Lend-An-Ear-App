import time
from googletrans import Translator

def compute_translation(text,destinationLanguage):
    translator = Translator()
    retry = 0
    retryLimit = 30
    timeOut = 0.1
    while(retry< retryLimit):
        try:
            result = translator.translate(text,dest=destinationLanguage)
            return result.text
        except:
            retry += 1
            time.sleep(timeOut)
    return "=ERROR="

# Usage
# text = 'お前はもう死んでいる'
# print(compute_translation(text,'en'))
