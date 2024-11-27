import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo and Description */}
          <div>
            <img src={logo} className="w-32 sm:w-48" alt="Company Logo" />
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              accusantium.
            </p>
            {/* Social Media Links */}
            <div className="flex mt-8 space-x-4 text-gray-600">
              {["Facebook", "Instagram", "Twitter", "GitHub", "Dribbble"].map(
                (platform, idx) => (
                  <Link
                    key={idx}
                    className="hover:opacity-75"
                    to="/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {/* Use appropriate platform icons */}
                    </svg>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <FooterSection
              title="Company"
              links={["About", "Meet the Team", "History", "Careers"]}
            />
            <FooterSection
              title="Services"
              links={[
                "1-on-1 Coaching",
                "Company Review",
                "Workshops",
                "Partnerships",
              ]}
            />
            <FooterSection
              title="Resources"
              links={["Blog", "Guides", "Help Center", "Support"]}
            />
            <FooterSection
              title="Contact"
              links={["Contact Us", "FAQs", "Feedback"]}
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          © 2024 Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, links }) {
  return (
    <div>
      <p className="font-medium text-gray-800">{title}</p>
      <nav className="mt-4 space-y-2">
        {links.map((link, idx) => (
          <Link
            key={idx}
            className="block text-sm text-gray-500 hover:text-gray-800"
            to="/"
          >
            {link}
          </Link>
        ))}
      </nav>
    </div>
  );
}
