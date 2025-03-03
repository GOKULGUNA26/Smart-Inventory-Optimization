import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from mlxtend.frequent_patterns import apriori, association_rules
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

# product dataset
data = {'usecase': ["I need an AirScale Baseband and a service router", 
                    "Looking for antennas for transceiver stations",
                    "Cloud packet core and routers required", 
                    "AirScale Baseband along with cloud packet services"],
        'products': [["AirScale Baseband (5G/4G Base Station)", "7750 Service Router (SR)"],
                     ["AirScale Micro Antennas", "AirScale Multi-band Antennas"],
                     ["Cloud Packet Core (CPC)", "7750 Service Router (SR)"],
                     ["AirScale Baseband (5G/4G Base Station)", "Cloud Packet Core (CPC)"]]
        }

df = pd.DataFrame(data)

# User input (Use case from customer)
user_input = "I need an AirScale Baseband along with cloud packet and service router also suggest me antennas for transceiver stations."

# Step 1: Preprocess the use case input 
def preprocess_usecase(usecase):
    tokens = word_tokenize(usecase.lower())
    return " ".join(tokens)

# Preprocess existing use cases in dataset
df['processed_usecase'] = df['usecase'].apply(preprocess_usecase)

# Step 2: Vectorize the processed use cases using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df['processed_usecase'])

# Step 3: Apply K-Means Clustering to group similar use cases
kmeans = KMeans(n_clusters=2, random_state=0)
df['cluster'] = kmeans.fit_predict(X)

# Preprocess user input for prediction
processed_input = preprocess_usecase(user_input)
input_vectorized = vectorizer.transform([processed_input])

# Predict the cluster for the user's input
user_cluster = kmeans.predict(input_vectorized)[0]

# Step 4: Suggest Primary Products based on similar use cases
similar_usecases = df[df['cluster'] == user_cluster]
primary_products = similar_usecases['products'].values[0]  # Suggest products from a similar use case

print("Primary Products:")
print(primary_products)

# Step 5: Prepare data for Apriori Algorithm (transaction-based)
transactions = df['products'].apply(lambda x: [item.strip() for item in x])

# Step 6: One-hot encoding the transaction dataset for Apriori
unique_items = sorted(set(item for sublist in transactions for item in sublist))
one_hot_df = pd.DataFrame(0, index=np.arange(len(transactions)), columns=unique_items)

for i, items in enumerate(transactions):
    one_hot_df.loc[i, items] = 1

# Step 7: Apply Apriori to find frequent item sets
frequent_itemsets = apriori(one_hot_df, min_support=0.2, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)


secondary_products = []
for index, rule in rules.iterrows():
    if set(primary_products).intersection(set(rule['antecedents'])):
        secondary_products.extend(list(rule['consequents']))

print("\nSecondary Products:")
print(secondary_products)
