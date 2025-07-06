import React from 'react';

function ResultCard({ value }) {
  return (
    <div style={{
      marginTop: '30px',
      padding: '25px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.4)',  // translucent white
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: '#1a1a1a',
      textAlign: 'center'
    }}>
      <h3 style={{
        fontWeight: '700',
        fontSize: '1.6rem',
        color: '#1f2937',
        marginBottom: '12px',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}>
         Predicted GHG Emission:
      </h3>
      <p style={{
        fontSize: '1.4rem',
        fontWeight: '600',
        color: '#065f46',
        textShadow: '0 1px 1px rgba(0,0,0,0.08)'
      }}>
        {value.toFixed(2)} <span style={{ fontWeight: '500', color: '#1f2937' }}>tonnes CO<sub>2</sub>e</span>
      </p>
    </div>
  );
}

export default ResultCard;
