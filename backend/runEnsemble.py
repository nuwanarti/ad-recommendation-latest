# building classifiers and ml dl models
from sklearn.ensemble import RandomForestClassifier
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
import random
import numpy as np

from pandas import read_csv
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv3D, MaxPooling3D, Dropout, SpatialDropout3D,LeakyReLU
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

from tensorflow.keras.utils import to_categorical
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, roc_auc_score

import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix, plot_confusion_matrix, ConfusionMatrixDisplay
# from sklearn.metrics import 
import plotly.express as px
import pandas as pd

model = tf.keras.models.load_model('./models/ensemble.h5')

# favAd = pd.read_csv('favAd.csv')
favAd = pd.read_csv('ensemble.csv')
x=favAd[['joy', 'sadness', 'disgust', 'contempt',
       'anger', 'fear', 'surprise', 'valence', 'engagement', 'smile', 'innerBrowRaise', 'browRaise', 'browFurrow',
       'noseWrinkle', 'upperLipRaise', 'lipCornerDepressor', 'chinRaise',
       'lipPucker', 'lipPress', 'lipSuck', 'mouthOpen', 'smirk', 'eyeClosure','lidTighten', 'jawDrop', 'dimpler', 'eyeWiden',
       'cheekRaise', 'lipStretch', 'age', 'gender']]
pred = model.predict(x)
arr = pred.argmax(1)
print(int(sum(arr/len(arr))))
# print(random.randint(0, 3))