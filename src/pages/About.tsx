import Header from "../components/Header";
import Footer from "../components/Footer";
import { Users, Globe, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Henry Odhiambo",
      role: "CEO",
      image: "/images/Henry.jpeg",
      bio: "A seasoned journalist with over 10 years of experience in media, strategy, and storytelling. Henry leads AfriEuropa News with a vision of connecting African diaspora communities across Europe through accurate and impactful reporting.",
    },
    {
      name: "Elizabeth Orayo",
      role: "COO",
      image: "/images/Lizzy.jpeg",
      bio: "A creative product designer and storyteller passionate about user-centered design. Elizabeth specializes in creating meaningful digital experiences that amplify diaspora voices, with a strong focus on migration and cultural integration.",
    },
    {
      name: "Hae-Won Jeon",
      role: "CTO",
      image: "https://t3.ftcdn.net/jpg/01/96/42/96/240_F_196429667_WXnNvlMkcrzjabpwoukvqJtEbyJIM7Gj.jpg",
      bio: "A dynamic journalist and event organizer dedicated to capturing authentic diaspora experiences. Hae-Won combines sharp writing skills with hands-on community engagement, bringing stories and events that resonate with Africans across Europe.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Diverse team working together"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About AfriEuropa News
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Connecting, informing, and empowering African diaspora communities across Europe 
            through quality journalism and storytelling.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4"> Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To bridge the information gap for African diaspora communities in Europe, 
            providing news, opportunities, and stories that matter to our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Building stronger connections within and across African diaspora communities.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Perspective</h3>
            <p className="text-gray-600">
              Connecting African diaspora experiences across European borders and beyond.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Opportunities</h3>
            <p className="text-gray-600">
              Highlighting career, education, and business opportunities for diaspora communities.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Stories</h3>
            <p className="text-gray-600">
              Sharing authentic voices and experiences that reflect our diverse community.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6"> Story</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                Founded in 2025, AfriEuropa News is the go-to platform for Africans living in Europe. Built by journalists, entrepreneurs, and community leaders from the diaspora, we tell the stories that matter—news, opportunities, and voices that reflect our everyday experiences.
                </p>
                <p className="mb-4">
                We exist to inform, connect, and celebrate African communities across Europe while bridging the gap between home and diaspora.
                </p>
                <p>
                  Today, we serve over 50,000 readers across 15 European countries, providing 
                  daily news updates, weekly newsletters, and in-depth features that celebrate 
                  our community's achievements and address our challenges.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://media.istockphoto.com/id/2204971934/photo/woman-reading-news-at-smart-phone.webp?a=1&b=1&s=612x612&w=0&k=20&c=5qEmsmXk8FysRRL1VQ_0cfyugK6lZ3i-6oV0aS96yyQ="
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600">
            Meet the dedicated professionals bringing AfriEuropa’s vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-52 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-700">
                We tell authentic stories that reflect the real experiences of African diaspora 
                communities, celebrating both struggles and successes.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-700">
                We maintain the highest standards of journalism, ensuring accuracy, fairness, 
                and ethical reporting in all our content.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Empowerment</h3>
              <p className="text-gray-700">
                We empower our community by providing information, opportunities, and platforms 
                that help individuals and communities thrive.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unity</h3>
              <p className="text-gray-700">
                We foster unity and solidarity among African diaspora communities while 
                celebrating our diversity and unique cultural contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
