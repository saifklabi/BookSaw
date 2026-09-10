"""
Interface Streamlit simple — Recommandation de livres à partir de
l'historique de l'utilisateur (livres déjà lus / achetés).

Principe :
    1. On affiche un catalogue fixe de livres, chacun avec une case à cocher.
    2. L'utilisateur coche les livres qu'il a déjà lus/achetés -> c'est son
       "historique".
    3. On déduit ses genres préférés à partir de cet historique.
    4. On envoie tout ça au LLM (Groq, Ollama ou Docker, au choix) et on
       affiche simplement le résultat -- pas de streaming, juste le texte
       final, pour rester simple.

Installation :
    pip install streamlit openai

Lancement :
    streamlit run app_catalogue.py
"""

import os
import streamlit as st
from openai import OpenAI


# ---------------------------------------------------------------------------
# Le catalogue de livres (fixe). Chaque livre a un titre, un auteur et un
# genre. C'est dans cette liste que l'utilisateur coche ce qu'il a déjà lu.
# ---------------------------------------------------------------------------

CATALOGUE = [
    {"titre": "1984", "auteur": "George Orwell", "genre": "dystopie"},
    {"titre": "Le Petit Prince", "auteur": "Antoine de Saint-Exupéry", "genre": "philosophie"},
    {"titre": "Fondation", "auteur": "Isaac Asimov", "genre": "science-fiction"},
    {"titre": "Dune", "auteur": "Frank Herbert", "genre": "science-fiction"},
    {"titre": "Le Seigneur des Anneaux", "auteur": "J.R.R. Tolkien", "genre": "fantasy"},
    {"titre": "Harry Potter à l'école des sorciers", "auteur": "J.K. Rowling", "genre": "fantasy"},
    {"titre": "Le Nom de la Rose", "auteur": "Umberto Eco", "genre": "policier"},
    {"titre": "Sherlock Holmes", "auteur": "Arthur Conan Doyle", "genre": "policier"},
    {"titre": "Orgueil et Préjugés", "auteur": "Jane Austen", "genre": "romance"},
    {"titre": "Les Misérables", "auteur": "Victor Hugo", "genre": "historique"},
    {"titre": "Le Comte de Monte-Cristo", "auteur": "Alexandre Dumas", "genre": "aventure"},
    {"titre": "Ça", "auteur": "Stephen King", "genre": "horreur"},
    {"titre": "Dracula", "auteur": "Bram Stoker", "genre": "horreur"},
    {"titre": "L'Étranger", "auteur": "Albert Camus", "genre": "philosophie"},
    {"titre": "Sapiens", "auteur": "Yuval Noah Harari", "genre": "essai / biographie"},
    {"titre": "Brave New World", "auteur": "Aldous Huxley", "genre": "dystopie"},
]


# ---------------------------------------------------------------------------
# Configuration de la page
# ---------------------------------------------------------------------------

st.set_page_config(page_title="Recommandation de livres", page_icon="📚")
st.title("📚 Recommandation de livres par IA")
st.caption(
    "Coche les livres que tu as déjà lus / achetés : on devine tes goûts "
    "à partir de cet historique et on te recommande la suite."
)


# ---------------------------------------------------------------------------
# Barre latérale — choix de la méthode LLM (les 3 méthodes du projet)
# ---------------------------------------------------------------------------

st.sidebar.header("⚙️ Méthode LLM")
methode = st.sidebar.selectbox(
    "Comment le LLM doit-il tourner ?",
    ["Groq (cloud)", "Ollama (local)", "Docker Model Runner (local)"],
)

groq_api_key = None
if methode == "Groq (cloud)":
    groq_api_key = st.sidebar.text_input(
        "Clé API Groq", type="password", value=os.environ.get("GROQ_API_KEY", "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")
    )
    modele = st.sidebar.text_input("Modèle", value="openai/gpt-oss-120b")
elif methode == "Ollama (local)":
    modele = st.sidebar.text_input("Modèle", value="llama3.2")
else:
    modele = st.sidebar.text_input("Modèle", value="ai/llama3.2")


# ---------------------------------------------------------------------------
# Le catalogue à cocher = l'historique de l'utilisateur
# ---------------------------------------------------------------------------

st.subheader("Les livres que tu as déjà lus / achetés")

livres_deja_lus = []
colonne_gauche, colonne_droite = st.columns(2)

for index, livre in enumerate(CATALOGUE):
    colonne = colonne_gauche if index % 2 == 0 else colonne_droite
    label = f"{livre['titre']} — {livre['auteur']} ({livre['genre']})"
    if colonne.checkbox(label, key=livre["titre"]):
        livres_deja_lus.append(livre)

lancer = st.button("🔍 Recommander des livres", type="primary")


# ---------------------------------------------------------------------------
# Les 3 méthodes indépendantes pour joindre le LLM.
# Chacune peut être appelée séparément -- ici on n'appelle que celle
# choisie dans la barre latérale, mais tu peux tester les 3 à la main
# en appelant directement ask_groq(...), ask_ollama(...) ou ask_docker(...).
# ---------------------------------------------------------------------------

def ask_groq(prompt: str, api_key: str, model: str) -> str:
    client = OpenAI(api_key=api_key, base_url="https://api.groq.com/openai/v1")
    reponse = client.chat.completions.create(
        model=model, messages=[{"role": "user", "content": prompt}]
    )
    return reponse.choices[0].message.content


def ask_ollama(prompt: str, model: str) -> str:
    client = OpenAI(api_key="ollama", base_url="http://localhost:11434/v1")
    reponse = client.chat.completions.create(
        model=model, messages=[{"role": "user", "content": prompt}]
    )
    return reponse.choices[0].message.content


def ask_docker(prompt: str, model: str) -> str:
    client = OpenAI(api_key="docker", base_url="http://localhost:12434/engines/v1")
    reponse = client.chat.completions.create(
        model=model, messages=[{"role": "user", "content": prompt}]
    )
    return reponse.choices[0].message.content


# ---------------------------------------------------------------------------
# Construction du prompt à partir de l'historique coché
# ---------------------------------------------------------------------------

def construire_prompt(livres: list[dict]) -> str:
    titres = "\n".join(f"- {l['titre']} ({l['auteur']}) — genre : {l['genre']}" for l in livres)
    genres_devines = ", ".join(sorted({l["genre"] for l in livres}))
    return f"""Voici l'historique de lecture d'un utilisateur :
{titres}

Genres qu'il semble aimer, déduits de son historique : {genres_devines}

Recommande-lui 3 nouveaux livres (différents de ceux listés ci-dessus)
qu'il devrait aimer. Pour chacun, donne le titre, l'auteur, et une phrase
expliquant pourquoi il devrait lui plaire."""


# ---------------------------------------------------------------------------
# Action au clic sur le bouton
# ---------------------------------------------------------------------------

if lancer:
    if not livres_deja_lus:
        st.warning("Coche au moins un livre pour qu'on puisse deviner tes goûts.")
        st.stop()

    if methode == "Groq (cloud)" and not groq_api_key:
        st.error("Ajoute ta clé API Groq dans la barre latérale avant de continuer.")
        st.stop()

    prompt = construire_prompt(livres_deja_lus)

    with st.spinner(f"Le modèle réfléchit ({methode})..."):
        try:0
            if methode == "Groq (cloud)":
                resultat = ask_groq(prompt, groq_api_key, modele)
            elif methode == "Ollama (local)":
                resultat = ask_ollama(prompt, modele)
            else:
                
                resultat = ask_docker(prompt, modele)
        except Exception as erreur:
            st.error(f"Impossible de contacter le modèle via {methode} : {erreur}")
            st.stop()

    st.subheader("📖 Recommandations")
    st.markdown(resultat)
