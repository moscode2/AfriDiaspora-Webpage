import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../data/firebase"; // Firestore config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        is_read: false,
        created_at: serverTimestamp(),
      });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send your message. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with our team. We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a message
            </h2>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  ✅ Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="editorial">Editorial Submission</option>
                  <option value="advertising">Advertising</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">hello@diasporalens.eu</p>
                    <p className="text-gray-600">editorial@diasporalens.eu</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Editorial Hotline</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM CET</p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Editorial Office</h3>
                    <p className="text-gray-600">
                      AfriEuropa Media <br />
                      123 Nairobi <br />
                      75001 Berlin, Germany
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Tips */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Story Tips & News</h3>
              <p className="mb-4">
                Have a story tip or breaking news from the diaspora community? We want to hear from you!
              </p>
              <a
                href="mailto:tips@diasporalens.eu"
                className="inline-flex items-center space-x-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send News Tip</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
