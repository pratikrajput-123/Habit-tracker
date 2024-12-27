import React from 'react';
import './home.css';
const testimonialsData = [
    {
      name: "Anjali Sharma",
      feedback: "This Habit Tracker transformed my life. I've built lasting habits and achieved my goals!",
      image: "https://via.placeholder.com/50",
      verified: true,
      stars: 5,
    },
    {
      name: "Vikram Joshi",
      feedback: "Simple yet effective! The reminders keep me on track, and the interface is user-friendly.",
      image: "https://via.placeholder.com/50",
      verified: true,
      stars: 5,
    },
    {
      name: "Deepa Mehta",
      feedback: "A wonderful tool! It keeps me accountable and helps me track my growth effectively!",
      image: "https://via.placeholder.com/50",
      verified: true,
      stars: 5,
    },
    {
      name: "Ajay Verma",
      feedback: "I love the insights feature! I can see where I need to improve in real-time.",
      image: "https://via.placeholder.com/50",
      verified: true,
      stars: 5,
    },
  ];
const Home = () => {
    
  return (
    <>
    <div className="hero-container">
      <div className="background-curve" />
      <div className="content-wrapper">
        <div className="hero-content">
          {/* Left content */}
          <div className="left-content">
            
            <h1 className="main-title">
              Empower Your Habits with Data
            </h1>
            
            <p className="subtitle">
              Track your habits effortlessly and achieve your goals with our intuitive Habit Tracker platform.
            </p>
            
            <div className="button-group">
              <button className="primary-button">
                Sign Up
              </button>
              <button className="secondary-button">
                Sign Up
              </button>
            </div>
          </div>
          
          {/* Right content - Phone mockup */}
          <div className="right-content">
            <div className="blue-circle" />
            <div className="phone-mockup">
              <div className="phone-inner">
                <img 
                  src="/api/placeholder/300/600" 
                  alt="Habit tracking app interface"
                  className="phone-screen"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className="features-wrapper">
    <p className="blue-text">
        Discover how our Habit Tracker elevates your routine and keeps you motivated.
    </p>
    <h1 className="main-heading">Explore Key Features</h1>
    <p className="sub-heading">
        Our Habit Tracker combines simplicity with advanced features to help you <br />
        cultivate positive habits effectively.
    </p>

    <div className="features-container">
        <div className="feature-box">
            <img src="" alt="" />
            <h4>Visual Insights</h4>
            <p>Gain insights into your progress with visually appealing charts and data representations. </p>
        </div>

        <div className="feature-box">
            <img src="" alt="" />
            <h4>Custom Reminders</h4>
            <p>Set personalized reminders to stay on healthy and to stay on track and never miss a habit. </p>
        </div>

        <div className="feature-box">
            <img src="" alt="" />
            <h4>Goal Setting</h4>
            <p>Define your objectives and monitor your journey to success with our robust goal-setting feature. </p>
        </div>
        </div>
    </div>



    <section className="testimonials-section">
      <div className="testimonials-header">
        <p className="highlight">What Our Users Say</p>
        <h2 className="title">Heartfelt Testimonials</h2>
      </div>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="stars">
              {"★".repeat(testimonial.stars)}
            </div>
            <p className="feedback">{`"${testimonial.feedback}"`}</p>
            <div className="user-info">
              <img src={testimonial.image} alt={testimonial.name} className="user-image" />
              <div>
                <h4 className="name">{testimonial.name}</h4>
                {testimonial.verified && <p className="verified">✔ Verified customer</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>

    
  );
};





export default Home;