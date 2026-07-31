from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    nvidia_api_key: str = ""
    nvidia_base_url: str = "https://integrate.api.nvidia.com/v1"
    nvidia_model: str = "meta/llama-3.1-70b-instruct"
    hf_api_token: str = ""
    app_env: str = "development"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
