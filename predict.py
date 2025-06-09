from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
from scipy.stats import entropy
import itertools
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/team_model_v3.pkl", "rb"))
champ_df = pd.read_csv("model/champion_with_roles.csv")

item_cols = [col for col in champ_df.columns if col.startswith("item_")]
required_cols = ['champion', 'kills', 'deaths', 'assists', 'damage', 'taken', 'heal', 'role_cluster'] + item_cols
champ_df = champ_df[required_cols].dropna()

def make_team_vector(champions: list[str]):
    team_df = pd.DataFrame()
    for name in champions:
        matched = champ_df[champ_df['champion'] == name]
        if matched.empty:
            raise ValueError(f"챔피언 이름 '{name}'에 해당하는 벡터가 없습니다.")
        row = matched.sample(1, random_state=42)
        team_df = pd.concat([team_df, row], ignore_index=True)

    team_df = team_df.sort_values(by='champion')

    vector = []
    total_kills = team_df['kills'].sum()
    total_assists = team_df['assists'].sum()
    total_deaths = team_df['deaths'].sum()
    team_kda = (total_kills + total_assists) / max(total_deaths, 1)
    avg_damage = team_df['damage'].mean()
    avg_taken = team_df['taken'].mean()
    avg_heal = team_df['heal'].mean()

    role_counts = team_df['role_cluster'].value_counts(normalize=True).sort_index()
    role_dist = np.zeros(5)
    for i in range(5):
        if i in role_counts:
            role_dist[i] = role_counts[i]
    role_entropy_val = entropy(role_dist + 1e-10)

    vector += [avg_damage, avg_taken, avg_heal, team_kda, role_entropy_val]

    for _, row in team_df.iterrows():
        vector += [
            row['champion'],
            row['kills'], row['deaths'], row['assists'],
            row['damage'], row['taken'], row['heal'],
            row['role_cluster']
        ]
        vector += row.filter(like='item_').tolist()

    return np.array(vector)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    champions = data.get("champions", [])
    if len(champions) < 5:
        return jsonify({"error": "최소 챔피언 5개가 필요합니다"}), 400
    if len(champions) > 15:
        return jsonify({"error": "최대 15개 챔피언까지만 입력 가능합니다"}), 400

    try:
        best_prob = -1
        best_combo = []

        combos = itertools.combinations(champions, 5)
        for combo in combos:
            try:
                vec = make_team_vector(list(combo))
                prob = model.predict_proba([vec])[0][1]
                if prob > best_prob:
                    best_prob = prob
                    best_combo = list(combo)
            except Exception:
                continue

        if not best_combo:
            return jsonify({"error": "유효한 조합이 없습니다"}), 500

        return jsonify({
            "recommendation": best_combo
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
