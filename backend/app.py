from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load('models/Margin_RF_model.pkl')
scaler = joblib.load('models/Margin_scaler.pkl')


@app.route('/')
def home():
    return '✅ GHG Emission Prediction API is Running'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        scaled_features = scaler.transform(features)
        prediction = model.predict(scaled_features)[0]
        return jsonify({'prediction': round(float(prediction), 2)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
