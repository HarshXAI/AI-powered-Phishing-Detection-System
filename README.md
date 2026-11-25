# AI-powered Phishing Detection System

Chrome extension (Manifest V3) that classifies the current page's URL as legitimate, suspicious or phishing using a Random Forest model served by a local Flask API. Includes notebooks for email and SMS phishing detection.

## How it works

1. The extension sends the active tab's URL to a local server (`http://127.0.0.1:5000`).
2. `server.py` extracts URL and page features (`features_extraction.py`): IP in URL, URL length, shortening services, domain age via WHOIS, and more.
3. A Random Forest model (`train.py`, saved with joblib) returns a verdict, shown in the extension popup.

Label scheme: `1` legitimate, `0` suspicious, `-1` phishing.

## Layout

| Path | What |
|---|---|
| `Extension/` | Chrome extension (`manifest.json`, `popup.*`, `background.js`, `content.js`) and Flask backend (`server.py`) |
| `Extension/train.py` | Trains the Random Forest classifier |
| `Extension/email.ipynb` | Email phishing detection experiments |
| `SMS/test.ipynb` | SMS phishing detection experiments |

## Run

```bash
cd Extension
pip install -r requirements.txt
python server.py
```

Then open `chrome://extensions`, enable Developer mode, choose **Load unpacked** and select the `Extension/` folder.

## Notes

- Model files (`*.pkl`) are included so the server runs without retraining.
- The URL feature extractor makes live network calls (WHOIS, search), so results depend on connectivity.
