import React from "react";
import "../styles/about.css";

const AboutUs = () => {
  return (
    <section className="aboutus">
      <div className="aboutus-content">
        <div className="text">
          <h1>About Us</h1>
        </div>
        <div className="content">
          <p>
            Welcome to Medical app, where innovation meets healthcare. Our
            mission is to revolutionize the way you manage your health by
            providing accessible, efficient, and personalized medical solutions.
            We combine the expertise of top healthcare professionals with
            cutting-edge technology to bring you a comprehensive platform for
            all your health needs.Our app offers personalized health insights, a
            powerful symptom checker, virtual consultations, medication
            management, and easy access to your health records. We prioritize
            patient-centric care, ensuring our services are user-friendly and
            supportive. With a strong commitment to privacy and security, we
            protect your personal health information with the highest standards.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
