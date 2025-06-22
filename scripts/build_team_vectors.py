import pandas as pd
import numpy as np
from tqdm import tqdm

champion_df = pd.read_csv("model/champion_vectors.csv")
role_df = pd.read_csv("model/champion_roles.csv")

champion_df['champion'] = champion_df['champion'].str.strip().str.lower()
role_df['champion'] = role_df['champion'].str.strip().str.lower()

role_list = [
    "Hybrid Fighter", "Burst Mage", "AP Assassin", "Hypercarry Marksman",
    "Enchanter Support", "Lethality Specialist", "Standard ADC",
    "Tank Support", "Early Bruiser", "Unused"
]

merged_df = pd.merge(champion_df, role_df, on="champion", how="left")

combat_stats = ['kills', 'deaths', 'assists', 'damage', 'taken', 'heal']

team_vectors = []

grouped = merged_df.groupby(['match_id', 'team_id'])

for (match_id, team_id), group in tqdm(grouped, desc="팀 벡터 생성 중"):
    if len(group) != 5:
        continue

    team_vector = {
        'match_id': match_id,
        'team_id': team_id,
        'win': group['win'].iloc[0],
    }

    for stat in combat_stats:
        team_vector[stat] = group[stat].mean()

    role_count = group['champion_role'].value_counts(normalize=True).to_dict()
    for role in role_list:
        team_vector[role] = role_count.get(role, 0)

    team_vectors.append(team_vector)

team_df = pd.DataFrame(team_vectors)
team_df.to_csv("model/team_vectors_v5.csv", index=False)
print("저장 완료: team_vectors_v5.csv")
