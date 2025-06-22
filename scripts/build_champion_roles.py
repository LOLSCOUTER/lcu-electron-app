import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("model/champion_vectors.csv")

combat_features = ['kills', 'deaths', 'assists', 'damage', 'taken', 'heal']
item_features = [col for col in df.columns if col.startswith('item_')]
features = combat_features + item_features

X = df[features].replace([np.inf, -np.inf], np.nan).fillna(0)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

k = 9
kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
df['role_cluster'] = kmeans.fit_predict(X_scaled)

champion_major_cluster = (
    df.groupby(['champion', 'role_cluster'])
      .size()
      .reset_index(name='count')
      .sort_values(['champion', 'count'], ascending=[True, False])
      .drop_duplicates(subset='champion')
)

role_map = {
    0: "Hybrid Fighter",
    1: "Burst Mage",
    2: "AP Assassin",
    3: "Hypercarry Marksman",
    4: "Enchanter Support",
    5: "Lethality Specialist",
    6: "Standard ADC",
    7: "Tank Support",
    8: "Early Bruiser"
}

champion_major_cluster['champion_role'] = champion_major_cluster['role_cluster'].map(role_map)

champion_roles = champion_major_cluster[['champion', 'champion_role']].sort_values('champion')
champion_roles.to_csv("model/champion_roles.csv", index=False)
print("저장 완료: champion_roles.csv")
