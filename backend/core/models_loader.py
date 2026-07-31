from transformers import pipeline
from sentence_transformers import SentenceTransformer
from services.knowledge_base import WORKFLOW_KB

class ModelsLoader:
    def __init__(self):
        self.sentence_transformer = None
        self.classifier_pipeline = None
        self.kb_embeddings = None
        self.ready = False

    async def initialize(self):
        self._load_sentence_transformer()
        self._load_classifier()
        self._precompute_kb_embeddings()
        self.ready = True

    def _load_sentence_transformer(self):
        try:
            self.sentence_transformer = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception as e:
            print(f"Error loading sentence transformer: {e}")

    def _load_classifier(self):
        try:
            self.classifier_pipeline = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=-1)
        except Exception as e:
            print(f"Error loading classifier: {e}")

    def _precompute_kb_embeddings(self):
        if self.sentence_transformer:
            descriptions = [kb["description"] for kb in WORKFLOW_KB]
            self.kb_embeddings = self.sentence_transformer.encode(descriptions, normalize_embeddings=True)

    def embed(self, text: str):
        if self.sentence_transformer:
            return self.sentence_transformer.encode([text], normalize_embeddings=True)[0]
        return None

    def classify(self, text: str, labels: list):
        if self.classifier_pipeline:
            return self.classifier_pipeline(text, candidate_labels=labels)
        return None

loader = ModelsLoader()
