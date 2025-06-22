import pandas as pd
from sklearn.model_selection import train_test_split
from catboost import CatBoostClassifier
from sklearn.metrics import accuracy_score, classification_report

df = pd.read_csv("model/team_vectors_v5.csv")

X = df.drop(columns=["match_id", "team_id", "win"])
y = df["win"]

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

model = CatBoostClassifier(verbose=0)
model.fit(X_train, y_train)

y_pred = model.predict(X_val)
print("정확도:", accuracy_score(y_val, y_pred))
print(classification_report(y_val, y_pred))

import pickle
with open("model/team_model_v5.pkl", "wb") as f:
    pickle.dump(model, f)
print("모델 저장 완료: team_model_v5.pkl")
