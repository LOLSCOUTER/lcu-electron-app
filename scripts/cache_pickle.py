import pandas as pd
import pickle

df = pd.read_csv("model/champion_vectors.csv")
df["champion"] = df["champion"].str.strip().str.lower()

roles_df = pd.read_csv("model/champion_roles.csv")
roles_df["champion"] = roles_df["champion"].str.strip().str.lower()
roles_df["champion_role"] = roles_df["champion_role"].str.strip()

combat_stats = ["kills", "deaths", "assists", "damage", "taken", "heal"]
champion_vector_cache = {
    row["champion"]: {stat: row[stat] for stat in combat_stats}
    for _, row in df.iterrows()
}

champion_roles = dict(zip(roles_df["champion"], roles_df["champion_role"]))

with open("model/champion_vector_cache.pkl", "wb") as f:
    pickle.dump(champion_vector_cache, f)

with open("model/champion_roles.pkl", "wb") as f:
    pickle.dump(champion_roles, f)

print("pkl 파일 재생성 완료")
