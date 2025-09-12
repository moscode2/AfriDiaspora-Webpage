

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditorialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Editorial Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl text-orange-600 font-medium mb-6">
              Our commitment to accurate, fair, and responsible journalism for the African diaspora in Europe.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Editorial Mission</h2>
            <p>
              We are  committed to providing accurate, fair, and balanced news coverage that serves 
              the African diaspora communities across Europe. We strive to inform, educate, and empower our 
              readers with quality journalism that respects diversity and promotes understanding.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Editorial Standards</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Accuracy and Verification</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All facts are verified through multiple reliable sources</li>
              <li>We distinguish clearly between news reporting and opinion pieces</li>
              <li>Corrections are published promptly and prominently when errors occur</li>
              <li>Sources are identified whenever possible, with anonymity granted only when necessary for safety or story validity</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Fairness and Balance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We present multiple perspectives on controversial issues</li>
              <li>All parties affected by our reporting are given the opportunity to respond</li>
              <li>We avoid stereotypes and generalizations about communities or individuals</li>
              <li>Personal bias does not influence our news reporting</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Independence</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our editorial content is independent of commercial and political interests</li>
              <li>Sponsored content is clearly labeled and separated from editorial content</li>
              <li>We do not accept payment for editorial coverage</li>
              <li>Conflicts of interest are disclosed transparently</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Content Guidelines</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cultural Sensitivity</h3>
            <p>
              We are committed to reporting with cultural awareness and sensitivity. Our coverage respects 
              the diversity of African diaspora experiences while avoiding generalizations that may 
              misrepresent communities or individuals.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Language and Tone</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We use clear, accessible language appropriate for our diverse readership</li>
              <li>Respectful tone is maintained in all content</li>
              <li>Inflammatory or divisive language is avoided</li>
              <li>Technical terms are explained when necessary</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Source Protection</h3>
            <p>
              We protect the identity of sources who request anonymity for legitimate reasons, including 
              personal safety, legal concerns, or professional retaliation. Source confidentiality is 
              taken seriously and maintained even under legal pressure.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Editorial Process</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Story Development</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Story ideas are evaluated for relevance to our diaspora audience</li>
              <li>Research and fact-checking are conducted before publication</li>
              <li>Multiple sources are consulted for complex or controversial topics</li>
              <li>Editorial review ensures adherence to our standards</li>
            </ol>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Editorial Oversight</h3>
            <p>
              All content undergoes editorial review to ensure accuracy, clarity, and adherence to our 
              editorial standards. The editorial team reserves the right to edit content for length, 
              clarity, and editorial standards.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Corrections and Complaints</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Corrections Policy</h3>
            <p>
              When errors are identified, we publish corrections promptly and prominently. Significant 
              corrections are noted at the top of the corrected article with the date of correction.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Reader Feedback</h3>
            <p>
              We welcome reader feedback and take complaints seriously. Concerns about editorial content 
              can be directed to our editorial team at editorial@diasporalens.eu.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Community Guidelines</h2>
            <p>
              Comments and user-generated content must be respectful and constructive. We reserve the 
              right to moderate or remove content that violates our community standards, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hate speech or discriminatory language</li>
              <li>Personal attacks or harassment</li>
              <li>Spam or promotional content</li>
              <li>Misinformation or false claims</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Editorial Team</h2>
            <p>
              For editorial inquiries, story tips, or concerns about our coverage, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Editorial Email:</strong> afrieuropamedia.com</p>
              <p><strong>News Tips:</strong> afrieuropamedia.com</p>
              <p><strong>Corrections:</strong> afriuropamedia.com</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
