import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

function InputForm() {
  const [formData, setFormData] = useState({
    commodityCode: '',
    substanceCode: '',
    unitCode: '',
    reliabilityCode: '',
    temporal: '',
    geo: '',
    tech: '',
    data: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        features: [
          Number(formData.commodityCode),
          Number(formData.substanceCode),
          Number(formData.unitCode),
          Number(formData.reliabilityCode),
          parseFloat(formData.temporal),
          parseFloat(formData.geo),
          parseFloat(formData.tech),
          parseFloat(formData.data)
        ]
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      alert("Prediction failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={{
    maxWidth: '750px',
    margin: '50px auto',
    padding: '35px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.4)',  // ⬅️ more white
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.15)',
    color: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }}>

      <h2 style={{
        textAlign: 'center',
        fontWeight: '800',
        fontSize: '1.7rem',
        color: '#1f2937',
        marginBottom: '30px'
      }}>
        Supply Chain GHG Prediction
      </h2>

      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '18px'
      }}>
        {[
          { label: 'Commodity Code', name: 'commodityCode' },
          { label: 'Substance Code', name: 'substanceCode' },
          { label: 'Unit Code', name: 'unitCode' },
          { label: 'Reliability Code', name: 'reliabilityCode' },
          { label: 'Temporal Correlation (0–1)', name: 'temporal' },
          { label: 'Geographical Correlation (0–1)', name: 'geo' },
          { label: 'Technological Correlation (0–1)', name: 'tech' },
          { label: 'Data Collection Correlation (0–1)', name: 'data' }
        ].map(field => (
          <div key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              style={{
                marginBottom: '5px',
                fontWeight: '600',
                fontSize: '0.95rem',
                color: '#0f172a'
              }}
            >
              {field.label}
            </label>
            <input
              type="number"
              step="0.01"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: '#111'
              }}
            />
          </div>
        ))}

        <div style={{ gridColumn: '1 / -1', marginTop: '15px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#10b981',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)'
            }}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </form>

      {prediction !== null && (
        <div style={{ marginTop: '30px' }}>
          <ResultCard value={prediction} />
        </div>
      )}
    </div>
  );
}

export default InputForm;
