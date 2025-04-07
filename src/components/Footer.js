import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white">
      <div className="container text-center">
        {/* Project Name */}
        <h5 className="mb-3">Provide Free Medical Services</h5>

        {/* Emergency Services */}
        <p>🚑 Emergency Helpline: <strong>911</strong></p>
        <p>📞 Contact for Medical Assistance: <strong>+1 234 567 890</strong></p>

        {/* Services & Vaccines Section */}
        <div className="row mt-3">
          {/* Our Services Box */}
          <div className="col-md-6">
            <div className="p-3 border rounded bg-secondary">
              <h6 className="text-white">Our Services</h6>
              <ul className="list-unstyled">
                <li>✔ Free Health Checkups</li>
                <li>✔ Emergency Medical Support</li>
                <li>✔ Vaccination Programs</li>
                <li>✔ Health Awareness Campaigns</li>
              </ul>
            </div>
          </div>

          {/* Vaccines Available Box */}
          <div className="col-md-6">
            <div className="p-3 border rounded bg-secondary">
              <h6 className="text-white">Vaccines We Provide</h6>
              <ul className="list-unstyled">
                <li>💉 Birth - 6 years</li>
                <li>💉 10 - 18 years</li>
                <li>💉 Adults (18+ years)</li>
               
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4">&copy; 2023-2024, Provide Free Medical Services. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
