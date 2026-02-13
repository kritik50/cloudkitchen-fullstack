import React from 'react';
// import './ForWhom.css'; 

const ForWhom = () => {
  const cards = [
    {
      id: "01",
      icon: "💪",
      title: "Muscle Gain",
      desc: "High-protein meals with surplus calories to support hypertrophy and heavy lifting sessions."
    },
    {
      id: "02",
      icon: "🔥",
      title: "Fat Loss",
      desc: "High volume, low calorie meals that keep you full while hitting a caloric deficit."
    },
    {
      id: "03",
      icon: "⚖️", // Changed icon to be more consistent
      title: "Maintenance",
      desc: "Perfectly macro-balanced meals for sustaining performance and healthy habits."
    }
  ];

  return (
    <section className="who-section">
      <h2 className="who-title">Who Is Gym<span>Bites</span> For?</h2>
      <p className="who-subtitle">
        Whether you’re cutting, bulking, or maintaining — we’ve got the fuel for your fire.
      </p>

      <div className="who-cards">
        {cards.map((card) => (
          <div className="who-card" key={card.id}>
            <span className="card-number">{card.id}</span>
            <div className="who-icon-wrapper">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForWhom;