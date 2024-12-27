import React, { useState } from 'react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        "Track up to 5 habits",
        "Basic analytics",
        "Daily reminders",
        "Mobile app access",
      ],
      highlighted: false
    },
    {
      name: "Standard",
      monthlyPrice: 14.99,
      annualPrice: 149.99,
      features: [
        "Track unlimited habits",
        "Advanced analytics",
        "Custom reminders",
        "Priority support",
        "Goal setting",
        "Progress sharing"
      ],
      highlighted: true
    },
    {
      name: "Premium",
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      features: [
        "Everything in Standard",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "White-label option",
        "24/7 premium support"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Choose Your Plan</h2>
      <p className="pricing-subtitle">Select the perfect plan for your habit tracking journey</p>
      
      <div className="toggle-container">
        <span className={!isAnnual ? 'active' : ''}>Monthly</span>
        <label className="toggle">
          <input 
            type="checkbox" 
            checked={isAnnual} 
            onChange={() => setIsAnnual(!isAnnual)}
          />
          <span className="slider"></span>
        </label>
        <span className={isAnnual ? 'active' : ''}>Annual</span>

      </div>

      <div className="plans-container">
        {plans.map((plan) => (
          <div key={plan.name} className={`plan-card ${plan.highlighted ? 'highlighted' : ''}`}>
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="period">/{isAnnual ? 'year' : 'month'}</span>
              </div>
            </div>
            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`plan-button ${plan.highlighted ? 'highlighted' : ''}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = `
  .pricing-container {
    padding: 6rem 2rem;
    background-color: #f8f9fa;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .pricing-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  .pricing-subtitle {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }

  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    position: relative;
  }

  .toggle-container span {
    color: #666;
    font-weight: 500;
  }

  .toggle-container span.active {
    color: #1a1a1a;
  }

  .save-badge {
    position: absolute;
    right: -80px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #e50914;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #e50914;
  }

  input:checked + .slider:before {
    transform: translateX(30px);
  }

  .plans-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .plan-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .plan-card.highlighted {
    transform: scale(1.05);
    border: 2px solid #e50914;
    position: relative;
  }

  .plan-card:hover {
    transform: translateY(-5px);
  }

  .plan-card.highlighted:hover {
    transform: scale(1.05) translateY(-5px);
  }

  .plan-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .plan-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  .price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.25rem;
  }

  .currency {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .amount {
    font-size: 3rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  .period {
    color: #666;
    font-size: 1rem;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: #4a5568;
  }

  .check-icon {
    width: 20px;
    height: 20px;
    color: #e50914;
  }

  .plan-button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #0f172a;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .plan-button:hover {
    background-color: #1a253b;
  }

  .plan-button.highlighted {
    background-color: #e50914;
  }

  .plan-button.highlighted:hover {
    background-color: #cc0812;
  }

  @media (max-width: 1024px) {
    .plans-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .plans-container {
      grid-template-columns: 1fr;
      max-width: 400px;
    }

    .plan-card.highlighted {
      transform: none;
    }

    .plan-card.highlighted:hover {
      transform: translateY(-5px);
    }

    .save-badge {
      position: static;
      transform: none;
      margin-left: 1rem;
    }
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default PricingSection;