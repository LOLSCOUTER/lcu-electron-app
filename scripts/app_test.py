from flask import Flask, request, jsonify
import pandas as pd
import itertools
import pickle

app = Flask(__name__)

with open("model/team_model_v5.pkl", "rb") as f:
    model = pickle.load(f)

champion_roles = pd.read_csv("model/champion_roles.csv")
champion_roles["champion"] = champion_roles["champion"].str.lower()

reference_df = pd.read_csv("model/champion_vectors.csv")
reference_df["champion"] = reference_df["champion"].str.lower()

role_list = [
    "Hybrid Fighter", "Burst Mage", "AP Assassin", "Hypercarry Marksman",
    "Enchanter Support", "Lethality Specialist", "Standard ADC",
    "Tank Support", "Early Bruiser", "Unused"
]

combat_stats = ["kills", "deaths", "assists", "damage", "taken", "heal"]

def build_team_vector(champion_list):
    roles = champion_roles[champion_roles['champion'].isin(champion_list)]['champion_role']
    role_counts = roles.value_counts(normalize=True).to_dict()

    stats = reference_df[reference_df['champion'].isin(champion_list)][combat_stats].mean()

    vector = {stat: stats.get(stat, 0) for stat in combat_stats}
    for role in role_list:
        vector[role] = role_counts.get(role, 0)

    return pd.DataFrame([vector])

@app.route("/predict/top1", methods=["POST"])
def predict_top1():
    data = request.get_json()
    fixed = [c.lower() for c in data.get("fixed", [])]
    candidates = [c.lower() for c in data.get("candidates", [])]
    
    results = []
    for c in candidates:
        if c in fixed:
            continue
        full_team = fixed + [c]
        if len(full_team) != 5:
            continue
        vec = build_team_vector(full_team)
        prob = model.predict_proba(vec)[0][1]
        results.append({"champion": c, "winrate": round(prob * 100, 2)})

    results.sort(key=lambda x: x["winrate"], reverse=True)
    return jsonify(results[:1])

@app.route("/predict/top5", methods=["POST"])
def predict_top5():
    data = request.get_json()
    pool = [c.lower() for c in data.get("pool", [])]

    if len(pool) < 5 or len(pool) > 15:
        return jsonify({"error": "Champion pool must be between 5 and 15"}), 400

    results = []
    for team in itertools.combinations(pool, 5):
        vec = build_team_vector(list(team))
        prob = model.predict_proba(vec)[0][1]
        results.append({"team": team, "winrate": round(prob * 100, 2)})

    results.sort(key=lambda x: x["winrate"], reverse=True)
    return jsonify(results[:5])

if __name__ == "__main__":
    app.run(port=5001)
