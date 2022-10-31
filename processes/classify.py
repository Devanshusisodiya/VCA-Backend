import sys
import tensorflow as tf
import numpy as np
from PIL import Image

def classify(name):
    model = tf.keras.models.load_model('./model1.h5')
    img = Image.open(f'./imgs/{name}.png')
    res = img.resize((224, 224)) # resizing the image
    res = res.transpose(Image.Transpose.TRANSPOSE) # taking the transpose of a portrait image
    pred_arr = np.array(res) # converting to numpy array
    exp = np.expand_dims(pred_arr, axis=0) # preparing to feed to model
    pred = model.predict(exp) # got the prediction over here

    class_names = ['devanshu', 'janya', 'mask', 'ria'] # class names

    # getting the index
    index = np.argmax(pred)

    # opening log file to save classification result
    log_file = open('./processes/log.txt', 'a')
    log_file.writelines(class_names[index] + '\n')
    log_file.close() # closing file

    return class_names[index]

# returning result of classification to node event loop
res = classify(sys.argv[1])
print(res)