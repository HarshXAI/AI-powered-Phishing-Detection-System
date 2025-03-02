# Purpose - This file is used to create a classifier and store it in a .pkl file. You can modify the contents of this
# file to create your own version of the classifier.

import numpy as np

from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn import metrics
import os
import joblib
os.makedirs('classifier', exist_ok=True)

# Load dataset correctly
with open('dataset/Training Dataset.arff', 'r') as file:
    data_list = file.read().splitlines()  # ✅ Use splitlines() to avoid platform issues

# Convert dataset into a 2D NumPy array
data1 = np.array([row.split(',') for row in data_list if row])  # ✅ Ensure non-empty rows

# Extract labels (last column) and features (all except last column)
labels = data1[:, -1]  # ✅ Extract labels (last column)
features = data1[:, :-1].astype(np.float64)  # ✅ Convert to numerical features

# Select only relevant features
selected_indices = [0, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 27, 29]
features = features[:, selected_indices]  # ✅ Correct indexing

features_train = features
labels_train = labels
# features_test=features[10000:]
# labels_test=labels[10000:]


print("\n\n ""Random Forest Algorithm Results"" ")
clf4 = RandomForestClassifier(min_samples_split=7, verbose=True)
clf4.fit(features_train, labels_train)
importances = clf4.feature_importances_
std = np.std([tree.feature_importances_ for tree in clf4.estimators_], axis=0)
indices = np.argsort(importances)[::-1]
# Print the feature ranking
print("Feature ranking:")
for f in range(features_train.shape[1]):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))

# pred4=clf4.predict(features_test)
# print(classification_report(labels_test, pred4))
# print 'The accuracy is:', accuracy_score(labels_test, pred4)
# print metrics.confusion_matrix(labels_test, pred4)

# sys.setrecursionlimit(9999999)
joblib.dump(clf4, 'classifier/random_forest.pkl', compress=9)
