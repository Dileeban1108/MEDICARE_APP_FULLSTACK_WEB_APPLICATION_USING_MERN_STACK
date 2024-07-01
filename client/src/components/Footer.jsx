import React from "react";
import "../styles/footer.css";
import { FaFacebook, FaInstagram ,FaPhone } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="footer__section">
          <h5 className="footer__heading">Join Us Today</h5>
          <p>
            Empower minds and embrace new learning opportunities with Medicare App. Join us in shaping the future of education!
          </p>
        </div>
        <div className="container_1">
          <h5 className="footer__heading">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/" className="footer__link">
                Home
              </a>
            </li>
            <li>
              <a href="login" className="footer__link">
                Log In
              </a>
            </li>
            <li>
              <a href="register" className="footer__link">
                Register
              </a>
            </li>
          </ul>
        </div>

        <div className="container_1">
          <h5 className="footer__heading">Contact Us</h5>
          <ul className="icons-list">
            <NavLink to="">
              <FaFacebook />
            </NavLink>
            <NavLink to="">
              <FaInstagram />
            </NavLink>
            or
            <NavLink to="">
              <FaPhone />:+94 76 456 3333
            </NavLink>

          </ul>
        </div>
      </section>

      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} All Rights Reserved!
      </div>
    </footer>
  );
};

export default Footer;
