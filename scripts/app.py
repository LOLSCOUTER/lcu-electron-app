from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import itertools

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

with open("model/team_model_v5.pkl", "rb") as f:
    model = pickle.load(f)

with open("model/champion_roles.pkl", "rb") as f:
    champion_roles = pickle.load(f)

with open("model/champion_vector_cache.pkl", "rb") as f:
    champion_vector_cache = pickle.load(f)

role_list = [
    "Hybrid Fighter", "Burst Mage", "AP Assassin", "Hypercarry Marksman",
    "Enchanter Support", "Lethality Specialist", "Standard ADC",
    "Tank Support", "Early Bruiser", "Unused"
]

combat_stats = ["kills", "deaths", "assists", "damage", "taken", "heal"]

def build_team_vector(champion_list):
    champ_stats = []
    for c in champion_list:
        if c not in champion_vector_cache:
            print(f"[ERROR] Missing vector for champion: {c}")
            return None
        champ_stats.append(champion_vector_cache[c])

    if len(champ_stats) != 5:
        print(f"[ERROR] Team does not have exactly 5 valid champions: {champion_list}")
        return None

    df = pd.DataFrame(champ_stats)
    stat_means = df[combat_stats].mean().to_dict()

    role_counts = {}
    for c in champion_list:
        role = champion_roles.get(c, "Unused")
        role_counts[role] = role_counts.get(role, 0) + 1
    role_distribution = {role: role_counts.get(role, 0) / 5 for role in role_list}

    vector = {**stat_means, **role_distribution}
    return pd.DataFrame([vector])

def remap_winrate(prob, min_val=40, max_val=60):
    return round(min_val + (max_val - min_val) * prob, 2)

@app.route("/predict/top1", methods=["POST"])
def predict_top1():
    try:
        data = request.get_json()
        fixed = [c.lower() for c in data.get("fixed", [])]
        candidates = [c.lower() for c in data.get("candidates", [])]

        if len(fixed) >= 5:
            return jsonify({"error": "Too many fixed champions (must be < 5)"}), 400

        results = []
        for c in candidates:
            if c in fixed:
                continue
            full_team = fixed + [c]
            if len(full_team) != 5:
                continue
            vec = build_team_vector(full_team)
            if vec is None:
                continue
            prob = model.predict_proba(vec)[0][1]
            winrate = remap_winrate(prob)
            results.append({"champion": c, "winrate": winrate})

        results.sort(key=lambda x: x["winrate"], reverse=True)
        return jsonify(results)
    except Exception as e:
        print(f"[EXCEPTION /predict/top1] {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/predict/top5", methods=["POST"])
def predict_top5():
    try:
        data = request.get_json()
        pool = [c.lower() for c in data.get("pool", [])]

        if len(pool) < 5 or len(pool) > 15:
            return jsonify({"error": "Champion pool must be between 5 and 15"}), 400

        results = []
        for team in itertools.combinations(pool, 5):
            vec = build_team_vector(list(team))
            if vec is None:
                continue
            prob = model.predict_proba(vec)[0][1]
            winrate = remap_winrate(prob)
            results.append({"team": list(team), "winrate": winrate})

        results.sort(key=lambda x: x["winrate"], reverse=True)
        return jsonify(results[:5])
    except Exception as e:
        print(f"[EXCEPTION /predict/top5] {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
