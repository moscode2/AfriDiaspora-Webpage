import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDCVBZa3h9uTgz11gt8JDH7u9QIJOGitws",
    authDomain: "afrieuropanews.firebaseapp.com",
    projectId: "afrieuropanews",
    storageBucket: "afrieuropanews.appspot.com",
    messagingSenderId: "77258538474",
    appId: "1:77258538474:web:da2087969fbd059e400693",
    measurementId: "G-VEVW0MXTBN",
  };
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const categories = [
    { id: 1,
            name: "News",
            slug: "news",
            description: "Breaking news and current events affecting diaspora communities",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 2,
            name: "Policy & Migration",
            slug: "policy-migration",
            description: "Immigration policies, legal updates, and migration stories",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 3,
            name: "",
            slug: "culture-lifestyle",
            description: "Celebrating our heritage, traditions, and modern diaspora life",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 4,
            name: "Profiles & Voices",
            slug: "profiles-voices",
            description: "Inspiring stories from community leaders and changemakers",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 5,
            name: "Travel & Mobility",
            slug: "travel-mobility",
            description: "Travel tips, visa information, and mobility within Europe",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 6,
            name: "Business & Jobs",
            slug: "business-jobs",
            description: "Career opportunities, entrepreneurship, and economic empowerment",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        },
        {
            id: 7,
            name: "Events",
            slug: "events",
            description: "Community gatherings, cultural events, and networking opportunities",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
        }, // Added closing bracket here
];
const articles = [
    {
        id: 1,
      title: "European Union Announces New Integration Support Programs for African Diaspora",
      slug: "eu-announces-new-integration-support-programs",
      excerpt: "The European Union has unveiled comprehensive support programs aimed at enhancing integration opportunities for African diaspora communities across member states.",
      content: `The European Union has unveiled comprehensive support programs aimed at enhancing integration opportunities for African diaspora communities across member states.
    
    The new initiative, launched this week in Brussels, includes funding for language learning programs, professional qualification recognition processes, and community-led integration projects.
    
    Commissioner for Home Affairs Ylva Johansson emphasized the importance of these programs: "We recognize the valuable contributions of African diaspora communities to European society and economy. These programs are designed to remove barriers and create pathways for full participation in our communities."
    
    The €50 million funding package will be distributed across all EU member states over the next three years, with priority given to programs that demonstrate measurable integration outcomes.
    
    Key components of the program include:
    - Professional mentorship networks
    - Digital skills training
    - Cultural bridge-building initiatives
    - Youth leadership development
    - Entrepreneurship support schemes
    
    Applications for funding will open in September 2024, with the first projects expected to launch in early 2025.`,
      featured_image_url: "https://mocha-cdn.com/0198dbb7-3dc2-734a-94c7-68f472e12814/news-conference.jpg",
      category_id: 2,
      author: "Maria Santos",
      is_featured: false,
      status: "published",
      published_at: "2024-08-20T09:00:00Z",
      created_at: "2024-08-20T09:00:00Z",
      updated_at: "2024-08-20T09:00:00Z",
      },
      {
        id: 2,
        title: "Complete Guide to Germany's Chancenkarte: Application Process and Requirements",
        slug: "germany-chancenkarte-application-process-requirements",
        excerpt: "Everything you need to know about applying for Germany's new points-based immigration system, including required documents and scoring criteria.",
        content: `Germany has officially introduced the Chancenkarte, or “Opportunity Card,” a points-based immigration system designed to attract skilled workers from non-EU countries. The scheme, launching in 2025, aims to fill labor shortages in sectors such as IT, healthcare, and engineering while offering a clearer and more flexible pathway for professionals seeking employment in Germany. The Chancenkarte evaluates candidates using a scoring model based on qualifications, work experience, age, and language skills, making the process more transparent and accessible to a wider pool of applicants.
      
      To apply, candidates must demonstrate recognized educational or vocational qualifications and sufficient financial resources to support themselves during the initial job search period. Additional points are awarded for German language proficiency, prior work experience in Germany, or being under a certain age threshold, which reflects the country’s long-term labor market needs. Applicants who meet the minimum points requirement will be granted a Chancenkarte, allowing them to enter Germany for up to one year while actively seeking employment opportunities.
      
      The Chancenkarte represents a major shift in Germany’s immigration policy, moving away from rigid requirements toward a more holistic assessment of talent. Experts believe the system will particularly benefit skilled professionals from Africa and other regions who may not have had straightforward access to the German job market before. With clear guidelines, streamlined recognition of foreign qualifications, and greater flexibility, the Chancenkarte is set to become one of Europe’s most attractive immigration pathways for global talent.`,
        featured_image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 2,
        author: "Anna Müller",
        is_featured: false,
        status: "published",
        published_at: "2024-08-08T09:00:00Z",
        created_at: "2024-08-08T09:00:00Z",
        updated_at: "2024-08-08T09:00:00Z"
      },
      {
        id: 3,
      title: "Understanding Your Rights: Worker Protection Laws Across Europe",
      slug: "understanding-worker-protection-laws-europe",
      excerpt: "A comprehensive overview of labor rights and protections available to African workers in different European countries.",
      content: `For African professionals and migrant workers in Europe, understanding labor rights is essential to ensuring fair treatment in the workplace. Across the European Union and beyond, worker protection laws are designed to safeguard employees from exploitation, guarantee minimum standards for working conditions, and promote equal opportunities regardless of nationality. These protections often cover wages, working hours, health and safety regulations, and access to social benefits, giving workers a legal foundation to demand fairness and dignity on the job.
    
    While many EU countries share common principles under European labor directives, national laws may differ significantly. For example, Germany and France enforce strong collective bargaining rights through trade unions, while countries like the Netherlands and Sweden emphasize flexible working arrangements and robust parental leave policies. African workers in these countries can benefit from knowing how local frameworks apply to them, including rights related to non-discrimination, equal pay, and safe working environments.
    
    Understanding these laws not only helps workers assert their rights but also builds confidence when navigating new professional landscapes abroad. Experts recommend that African workers engage with labor unions, legal aid groups, and migrant support organizations to stay informed about changes in legislation and workplace practices. With greater awareness of their rights, African professionals in Europe can protect themselves from unfair treatment while contributing fully and securely to their host countries’ economies.`,
      featured_image_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      category_id: 2,
      author: "David Okoro",
      is_featured: false,
      status: "published",
      published_at: "2024-08-04T09:00:00Z",
      created_at: "2024-08-04T09:00:00Z",
      updated_at: "2024-08-04T09:00:00Z"
      },
          {
            id: 2,
            title: "African Food Festival Brings Communities Together in Berlin",
            slug: "african-food-festival-berlin-2024",
            excerpt: "The annual African Food Festival in Berlin attracted over 15,000 visitors, showcasing the rich culinary traditions of the continent's diaspora communities.",
            content: `The annual African Food Festival in Berlin attracted over 15,000 visitors this weekend, showcasing the rich culinary traditions of the continent's diaspora communities.
          
          Held at Tempelhofer Feld, the three-day festival featured over 50 food vendors representing countries from across Africa, live music performances, and cultural exhibitions.
          
          "This festival is more than just food," said festival organizer Amina Kone. "It's about celebrating our heritage, sharing our stories, and building bridges between communities."
          
          The event highlighted the growing influence of African cuisine in European food culture, with several vendors announcing plans to open permanent restaurants in the city.
          
          Festival highlights included:
          - Traditional Ethiopian coffee ceremonies
          - West African drumming workshops
          - Cooking demonstrations by celebrity chefs
          - Children's cultural activities
          - Business networking sessions for African entrepreneurs
          
          The festival also served as a platform for discussing food security and sustainable agriculture, with panel discussions featuring experts from both Africa and Europe.
          
          Next year's festival is planned to expand to include a food truck rally and popup markets throughout Berlin during the summer months.`,
            featured_image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category_id: 3,
            author: "James Okafor",
            is_featured: true,
            status: "published",   // ← don’t forget this if required by your type
            published_at: "2024-08-18T14:30:00Z",
            created_at: "2024-08-18T14:30:00Z",
            updated_at: "2024-08-18T14:30:00Z",
      },
        {
          id: 4,
      title: "The Rise of African Fashion in European Runways",
      slug: "rise-african-fashion-european-runways",
      excerpt: "How African designers are making their mark in Paris, Milan, and London fashion weeks, bringing authentic African aesthetics to global audiences.",
      content: `African fashion has rapidly risen to the forefront of the global style scene, with designers from across the continent and diaspora making bold statements on Europe’s most prestigious runways. In cities like Paris, Milan, and London, African-inspired collections are redefining modern fashion with vibrant colors, traditional textiles, and storytelling rooted in heritage. This cultural wave is not only enriching the fashion world but also giving visibility to African creativity on an international stage.
    
    European audiences have increasingly embraced African aesthetics, from Ankara prints and Kente cloth to beadwork and innovative reinterpretations of traditional garments. Designers such as Thebe Magugu, Imane Ayissi, and others have gained recognition for blending contemporary cuts with authentic African elements, challenging stereotypes and expanding the narrative of what luxury fashion can represent. The growing demand has also opened doors for emerging African brands to collaborate with global fashion houses.
    
    Beyond aesthetics, the rise of African fashion in Europe symbolizes a broader cultural exchange and economic opportunity. By showcasing African heritage at top fashion weeks, designers are not only building global brands but also creating jobs and empowering artisans back home. As European markets continue to welcome African talent, the runway becomes more than a stage—it becomes a bridge connecting cultures, economies, and identities.`,
      featured_image_url: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
      category_id: 3,
      author: "Amina Diallo",
      is_featured: false,
      status: "published",
      published_at: "2024-07-28T09:00:00Z",
      created_at: "2024-07-28T09:00:00Z",
      updated_at: "2024-07-28T09:00:00Z"
    },
    {
      id: 5,
      title: "Understanding Your Rights: Worker Protection Laws Across Europe",
      slug: "understanding-worker-protection-laws-europe",
      excerpt: "A comprehensive overview of labor rights and protections available to African workers in different European countries.",
      content: `For African workers building careers in Europe, understanding labor rights is essential to ensuring fair treatment and protection. Worker protection laws vary across European countries, but many share strong frameworks that guarantee minimum wages, safe working conditions, paid leave, and equal opportunities regardless of nationality. These regulations aim to safeguard workers from exploitation while promoting inclusivity in the labor market.
    
    In countries like Germany, France, and the Netherlands, labor laws emphasize collective bargaining, workplace safety, and anti-discrimination protections. Workers are entitled to written contracts, regulated working hours, and social security benefits. Recent EU directives have also strengthened protections for temporary and migrant workers, making it harder for employers to engage in unfair practices such as wage theft or unsafe conditions. For African professionals, this legal landscape provides reassurance and opportunities to pursue meaningful careers abroad.
    
    However, navigating these rights can be challenging without proper awareness. Experts recommend that African workers familiarize themselves with host-country labor unions, legal aid organizations, and community networks that can provide support when disputes arise. By understanding and exercising these protections, African workers in Europe can not only defend their rights but also contribute confidently to diverse workplaces and economies across the continent.`,
      featured_image_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      category_id: 2,
      author: "David Okoro",
      is_featured: false,
      status: "published",
      published_at: "2024-08-04T09:00:00Z",
      created_at: "2024-08-04T09:00:00Z",
      updated_at: "2024-08-04T09:00:00Z"
    },
          {
            id: 5,
      title: "Understanding Your Rights: Worker Protection Laws Across Europe",
      slug: "understanding-worker-protection-laws-europe",
      excerpt: "A comprehensive overview of labor rights and protections available to African workers in different European countries.",
      content: `For African workers building careers in Europe, understanding labor rights is essential to ensuring fair treatment and protection. Worker protection laws vary across European countries, but many share strong frameworks that guarantee minimum wages, safe working conditions, paid leave, and equal opportunities regardless of nationality. These regulations aim to safeguard workers from exploitation while promoting inclusivity in the labor market.
    
    In countries like Germany, France, and the Netherlands, labor laws emphasize collective bargaining, workplace safety, and anti-discrimination protections. Workers are entitled to written contracts, regulated working hours, and social security benefits. Recent EU directives have also strengthened protections for temporary and migrant workers, making it harder for employers to engage in unfair practices such as wage theft or unsafe conditions. For African professionals, this legal landscape provides reassurance and opportunities to pursue meaningful careers abroad.
    
    However, navigating these rights can be challenging without proper awareness. Experts recommend that African workers familiarize themselves with host-country labor unions, legal aid organizations, and community networks that can provide support when disputes arise. By understanding and exercising these protections, African workers in Europe can not only defend their rights but also contribute confidently to diverse workplaces and economies across the continent.`,
      featured_image_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      category_id: 2,
      author: "David Okoro",
      is_featured: false,
      status: "published",
      published_at: "2024-08-04T09:00:00Z",
      created_at: "2024-08-04T09:00:00Z",
      updated_at: "2024-08-04T09:00:00Z"
          },
            { id: 6,
              title: "Raising African Children in Europe: Balancing Two Cultures",
              slug: "raising-african-children-in-europe-balancing-two-cultures",
              excerpt: "Parents share their experiences and strategies for helping their children maintain African cultural identity while integrating into European society.",
              content: `Raising children in Europe while preserving African cultural identity can be both rewarding and challenging for parents. Many families strive to create an environment where their children can embrace their heritage while also adapting to European social and educational systems. This balance often involves language preservation, storytelling, traditional celebrations, and teaching children the values of respect and community deeply rooted in African culture.
            
            At the same time, African parents in Europe recognize the importance of ensuring that their children integrate successfully into local society. This includes supporting their education, encouraging friendships across cultures, and teaching them how to navigate different worldviews. Schools, community centers, and diaspora organizations play a vital role in helping families bridge the gap between home traditions and the realities of life in Europe.
            
            Ultimately, raising African children in Europe is about building confident young people who can thrive in multicultural environments. By celebrating both African and European influences, parents equip their children with a dual sense of identity—one that strengthens family bonds while preparing them to engage meaningfully in diverse societies. The experience of growing up between cultures can be a powerful asset, fostering resilience, empathy, and global awareness.`,
              featured_image_url: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600",
              category_id: 3,
              author: "Amina Diallo",
              is_featured: false,
              status: "published",
              published_at: "2024-08-02T09:00:00Z",
              created_at: "2024-08-02T09:00:00Z",
              updated_at: "2024-08-02T09:00:00Z"
            
            },
            {
              id: 3,
              title: "Tech Entrepreneur from Lagos Launches AI Startup in Amsterdam",
              slug: "lagos-entrepreneur-ai-startup-amsterdam",
              excerpt: "Dr. Adaora Okwu's new artificial intelligence company aims to bridge the digital divide between African and European markets.",
              content: `Dr. Adaora Okwu, a tech entrepreneur originally from Lagos, Nigeria, has launched her groundbreaking artificial intelligence startup in Amsterdam, attracting €2.5 million in seed funding.
            
            The company, called BridgeAI, focuses on developing AI solutions that work effectively across different cultural and linguistic contexts, particularly between African and European markets.
            
            "There's a significant gap in AI technology that truly understands diverse cultural contexts," Dr. Okwu explained. "Our solutions are designed to bridge this divide and create more inclusive digital experiences."
            
            BridgeAI's first product is a multilingual customer service platform that can seamlessly switch between European languages and major African languages, while understanding cultural nuances in communication styles.
            
            The startup has already secured partnerships with three major European telecommunications companies and two pan-African banks.
            
            Dr. Okwu's journey to Amsterdam began with a scholarship to study computer science at the University of Amsterdam, where she completed her PhD in machine learning. After working for several tech giants in Silicon Valley, she returned to Europe to build her vision of culturally-aware AI.
            
            The funding round was led by Amsterdam-based VC firm TechStars Europe, with participation from Impact Angels and the Dutch Development Bank.
            
            BridgeAI plans to hire 25 employees by the end of 2024, with offices planned for both Amsterdam and Lagos to maintain strong connections to both markets.`,
              featured_image_url: "https://mocha-cdn.com/0198dbb7-3dc2-734a-94c7-68f472e12814/tech-presentation.jpg",
              category_id: 6,
              author: "Sophie Anderson",
              is_featured: false,
              status: "published",   // ← don’t forget this
              published_at: "2024-08-15T11:15:00Z",
              created_at: "2024-08-15T11:15:00Z",
              updated_at: "2024-08-15T11:15:00Z",
      },
      {
        id: 7,
        title: "EU Blue Card Requirements Updated for 2025: New Opportunities for African Professionals",
        slug: "eu-blue-card-requirements-updated-for-2025-new-opportunities-for-african-professionals",
        excerpt: "The European Union announces significant changes to Blue Card eligibility, making it easier for skilled African workers to obtain residence permits.",
        content: `The European Union has announced major reforms to its Blue Card program in 2025, opening new pathways for skilled workers from Africa to live and work in Europe. The changes aim to make the application process simpler, expand eligibility to more professions, and lower the salary thresholds required for applicants. This marks a significant step toward addressing Europe’s growing demand for skilled labor while creating new prospects for African professionals seeking international opportunities.
      
      Under the updated rules, the Blue Card will now recognize a wider range of qualifications, including professional certifications and vocational training in addition to university degrees. This change particularly benefits sectors such as information technology, healthcare, and engineering, where Africa has a strong and growing talent pool. The EU also plans to streamline recognition of African qualifications, reducing the barriers that previously made it difficult for applicants to compete in the European job market.
      
      For many African professionals, these reforms present an opportunity not only to advance their careers abroad but also to strengthen connections between Africa and Europe. Experts suggest that the policy could help reduce skill mismatches in Europe while encouraging the transfer of knowledge and experience back to African economies. With the updated Blue Card framework, the EU signals its intention to attract global talent while promoting mobility, inclusivity, and economic growth across continents.`,
        category_id: 1,
        featured_image_url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Samuel Okoye",
        is_featured: false,
        status: "published",
        published_at: "2025-01-10T08:30:00Z",
        created_at: "2025-01-10T08:30:00Z",
        updated_at: "2025-01-10T08:30:00Z"
      },
      {
        id: 8,
        title: "African Students Win Big at European Innovation Challenge",
        slug: "african-students-win-big-at-european-innovation-challenge",
        excerpt: "Three African diaspora students from universities across Europe take top prizes in the annual EU Innovation Challenge with groundbreaking solutions.",
        content: `Three African diaspora students studying in Europe have made headlines after winning top prizes at the 2025 EU Innovation Challenge, a competition that brings together young minds to solve pressing global issues through technology and creativity. Their projects stood out for their originality, practical applications, and potential to make a meaningful social impact. The event, held in Brussels, drew participants from more than 20 countries, making the victories even more significant for the African community abroad.
      
      One of the winners, a Kenyan engineering student in Germany, developed an AI-powered tool to improve access to clean water in underserved communities. Another, a Nigerian student in France, introduced a renewable energy solution designed to reduce carbon emissions in urban transport. Meanwhile, a Ghanaian student in the Netherlands received recognition for an innovative healthcare platform aimed at improving remote medical consultations. Judges praised the projects not only for their technical excellence but also for their ability to address challenges shared across continents.
      
      The success of these students highlights the growing role of African talent in Europe’s innovation ecosystem. Beyond personal achievement, their victories underscore the value of diversity in problem-solving and the importance of cross-continental collaboration. As Europe continues to invest in innovation and Africa strengthens its pool of young professionals, these wins symbolize a shared future where talent and ideas transcend borders, shaping solutions for global progress.`,
        category_id: 1,
        featured_image_url: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Chantal Mumba",
        is_featured: false,
        status: "published",
        published_at: "2025-01-10T12:00:00Z",
        created_at: "2025-01-10T12:00:00Z",
        updated_at: "2025-01-10T12:00:00Z"
      },
      {
        id: 9,
        title: "New Scholarship Program Targets African Women in STEM",
        slug: "new-scholarship-program-targets-african-women-in-stem",
        excerpt: "The European Research Council launches a €50 million scholarship program specifically designed for African women pursuing STEM degrees in Europe.",
        content: `The European Research Council (ERC) has announced the launch of a groundbreaking €50 million scholarship program aimed at supporting African women pursuing degrees in science, technology, engineering, and mathematics (STEM) across European universities. The initiative, set to begin in the 2025 academic year, reflects Europe’s growing commitment to fostering diversity in research and innovation while addressing the underrepresentation of women in STEM fields.
      
      The scholarship program will cover tuition fees, living stipends, and mentorship opportunities, creating a comprehensive support system for recipients. Beyond financial assistance, scholars will gain access to cutting-edge research labs, professional development workshops, and networks with leading European academics and industry leaders. Priority will be given to applicants who demonstrate a strong commitment to solving real-world challenges in their home countries, ensuring that the program also contributes to knowledge transfer and sustainable development back in Africa.
      
      Advocates believe the initiative has the potential to transform opportunities for African women in STEM, both in Europe and beyond. By removing financial barriers and providing targeted mentorship, the program is expected to inspire a new generation of innovators who can bridge scientific collaboration between Africa and Europe. Experts suggest that the move could set a precedent for other global scholarship programs, placing inclusivity and equity at the heart of international education.`,
        category_id: 1,
        featured_image_url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Leila Abebe",
        is_featured: false,
        status: "published",
        published_at: "2025-01-09T14:00:00Z",
        created_at: "2025-01-09T14:00:00Z",
        updated_at: "2025-01-09T14:00:00Z"
      },
            {
              id: 4,
      title: "New Study Reveals Growing Political Participation Among African Diaspora in France",
      slug: "political-participation-african-diaspora-france-study",
      excerpt: "Research from Sciences Po shows a 40% increase in political engagement among African diaspora communities in France over the past five years.",
      content: `A comprehensive study released by Sciences Po this week reveals a significant increase in political participation among African diaspora communities in France, with engagement levels rising by 40% over the past five years.
    
    The research, conducted over 18 months, surveyed 5,000 individuals across 12 French cities and analyzed voting patterns, civic organization membership, and local political involvement.
    
    Professor Marie Dubois, who led the research team, noted: "We're witnessing a transformation in how African diaspora communities engage with French political life. This isn't just about voting – it's about active participation in shaping policy."
    
    Key findings include:
    - 65% increase in local council candidacies
    - 45% rise in civic organization leadership roles
    - 38% growth in voter registration among 18-35 age group
    - 52% increase in participation in community organizing
    
    The study attributes this growth to several factors, including improved political representation, targeted civic education programs, and growing awareness of political rights among second and third-generation immigrants.
    
    "Young people especially are refusing to be politically invisible," said community organizer Fatou Diallo. "They see politics as a tool for change, not just something that happens to them."
    
    The research also highlighted challenges, including language barriers in political processes and underrepresentation in major political parties.
    
    The French government has announced plans to establish a new council on diaspora political participation based on the study's recommendations.`,
      featured_image_url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      category_id: 1,
      author: "Pierre Martin",
      is_featured: false,        // ← added for consistency
      status: "published",       // ← added for consistency
      published_at: "2024-08-12T16:45:00Z",
      created_at: "2024-08-12T16:45:00Z",
      updated_at: "2024-08-12T16:45:00Z",
            },
          
            {
              id: 5,
              title: "African Artists Showcase Contemporary Art at Venice Biennale",
              slug: "african-artists-venice-biennale-2024",
              excerpt: "This year's Venice Biennale features the largest-ever representation of African diaspora artists, highlighting themes of migration, identity, and belonging.",
              content: `This year's Venice Biennale features the largest-ever representation of African diaspora artists, with 23 artists showcasing works that explore themes of migration, identity, and belonging in contemporary Europe.
            
            The exhibition, titled "Crossing Waters: African Voices in European Spaces," has drawn international acclaim for its powerful exploration of diaspora experiences.
            
            Curator Dr. Kwame Asante explained: "These artists are creating a visual dialogue about what it means to be African in Europe today. Their work challenges traditional narratives and creates new spaces for cultural expression."
            
            Featured artists include:
            - Yinka Shonibare (British-Nigerian) with his signature fabric sculptures
            - Kader Attia (French-Algerian) presenting video installations on colonial memory
            - Barthélémy Toguo (Cameroonian-German) with performance art pieces
            - Wangechi Mutu (Kenyan-American) displaying her feminist African futurism works
            
            The exhibition has sparked important conversations about representation in European art institutions and the need for more diverse curatorial voices.
            
            "Seeing our stories told through art in such a prestigious venue validates our experiences," said visitor Amara Dieng, an art student from Paris. "It shows that our perspectives matter in European cultural discourse."
            
            The Venice Biennale runs until November 2024, with several of the featured works planned for a traveling exhibition across European capitals next year.
            
            Art critics have praised the exhibition as a watershed moment for African diaspora representation in contemporary European art.`,
              featured_image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              category_id: 3,
              author: "Isabella Romano",
              is_featured: false,
              status: "published",   // ← added for consistency
              published_at: "2024-08-10T13:20:00Z",
              created_at: "2024-08-10T13:20:00Z",
              updated_at: "2024-08-10T13:20:00Z",
      },
        {
          title: "Dr. Amina Okafor",
          // role: "AI Researcher & Lecturer", // Removed to fix the error
          slug: "dr-amina-okafor",
          excerpt: "Passionate about bridging the AI knowledge gap in Africa by mentoring young women in tech.",
          content: `
        Dr. Amina Okafor has dedicated her career to advancing artificial intelligence research with a focus on African contexts. She believes that innovation in AI should not just mirror global trends, but should address the unique challenges and opportunities present across the continent. By actively engaging in both academic research and practical AI applications, she strives to create solutions that are relevant, ethical, and sustainable for African communities.
        
        In addition to her research, Dr. Okafor is deeply committed to mentorship and education. She runs workshops and mentorship programs aimed at young women in technology, helping them gain skills and confidence to pursue careers in AI and related fields. Through her guidance, she fosters a new generation of African AI leaders who are empowered to contribute to the global AI landscape while reflecting local realities.
          `,
          category_id: 4,
          featured_image_url: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600",
          timeAgo: "2 hours ago",
          id: 0,
          author: null,
          is_featured: false,
          published_at: null,
          created_at: '',
          updated_at: '',
          status: 'published'
        },
        {
          title: "David Kamau",
          // role: "Climate Change Activist", // Removed to fix the error
          slug: "david-kamau",
          excerpt: "Advocates for renewable energy adoption across rural communities in Kenya.",
          content: `
        David Kamau has been at the forefront of climate activism in Kenya, focusing on sustainable energy solutions for rural communities. He believes that access to renewable energy is not only a tool for environmental preservation but also a catalyst for economic development. Through grassroots initiatives, David works with local communities to implement solar and wind energy solutions that reduce dependence on non-renewable resources and lower carbon emissions.
        
        In addition to hands-on projects, David actively engages in public awareness campaigns and policy advocacy. He collaborates with government bodies, NGOs, and educational institutions to promote climate-conscious practices and the adoption of clean energy technologies. His work empowers communities to take ownership of their environmental impact while contributing to Kenya’s broader sustainability goals.
          `,
          category_id: 4,
          featured_image_url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
          timeAgo: "5 hours ago",
          id: 0,
          author: null,
          is_featured: false,
          published_at: null,
          created_at: '',
          updated_at: '',
          status: 'published'
        },
        {
          title: "Fatou Ndiaye",
          // role: "Entrepreneur, Fashion Tech", // Removed to fix the error
          slug: "fatou-ndiaye",
          excerpt: "Founder of a fashion-tech startup that empowers African designers to sell globally.",
          content: `
        Fatou Ndiaye is a visionary entrepreneur revolutionizing the African fashion industry through technology. Her startup provides a platform where designers from across the continent can showcase their work and reach global audiences. By integrating e-commerce, digital marketing, and design tools, Fatou empowers creative talent to build sustainable businesses and expand their international footprint.
        
        Beyond her company, Fatou actively mentors young African designers, guiding them on business strategy, branding, and tech adoption. She believes that fashion innovation should reflect African culture and heritage while meeting modern market demands. Her work bridges creativity and technology, helping Africa’s fashion sector thrive on a global scale.
          `,
          category_id: 4,
          featured_image_url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
          timeAgo: "12 hours ago",
          id: 0,
          author: null,
          is_featured: false,
          published_at: null,
          created_at: '',
          updated_at: '',
          status: 'published'
        },
        {
          title: "Joseph Mwangi",
          // role: "Software Engineer", // Removed to fix the error
          slug: "joseph-mwangi",
          excerpt: "Full-stack developer contributing to open-source projects that solve African problems.",
          content: `
        Joseph Mwangi is a skilled full-stack developer dedicated to creating software solutions that address real-world challenges across Africa. He actively contributes to open-source projects, focusing on tools and platforms that enhance access to technology and improve community services. His work bridges the gap between innovative software and social impact, making technology more accessible and useful to African communities.
        
        In addition to coding, Joseph mentors aspiring developers, sharing best practices in modern web development, cloud computing, and collaborative software design. He believes that nurturing local talent is essential for building sustainable tech ecosystems, and his projects often incorporate collaborative features to empower other developers and organizations to solve regional problems efficiently.
          `,
          category_id: 4,
          featured_image_url: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
          timeAgo: "1 day ago",
          id: 0,
          author: null,
          is_featured: false,
          published_at: null,
          created_at: '',
          updated_at: '',
          status: 'published'
        },
        {
          title: "Grace Mensah",
          // role: "Medical Doctor & Public Health Advocate", // Removed to fix the error
          slug: "grace-mensah",
          excerpt: "Works on community health programs addressing maternal and child health in Ghana.",
          content: `
        Dr. Grace Mensah is a dedicated medical doctor and public health advocate committed to improving maternal and child health outcomes in Ghana. She designs and implements community health programs that focus on preventive care, nutrition, and access to essential medical services. Her initiatives aim to reduce health disparities and empower local communities with the knowledge and resources to lead healthier lives.
        
        Beyond her clinical work, Dr. Mensah mentors young healthcare professionals and engages in health policy advocacy to ensure sustainable improvements in public health systems. She believes that lasting change comes from combining medical expertise with community-driven solutions, creating programs that are both effective and culturally sensitive.
          `,
          category_id: 4,
          featured_image_url: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
          timeAgo: "2 days ago",
          id: 0,
          author: null,
          is_featured: false,
          published_at: null,
          created_at: '',
          updated_at: '',
          status: 'published'
        },
      {
        id: 1,
        title: "Kenya Launches New High-Speed Train to the Coast",
        slug: "kenya-launches-new-high-speed-train-to-the-coast",
        excerpt: "The modern rail line reduces travel time between Nairobi and Mombasa to just 3 hours, boosting tourism and trade.",
        content: `
      Kenya has unveiled its latest transportation milestone with the launch of a new high-speed train connecting Nairobi to the coastal city of Mombasa. The state-of-the-art rail line slashes travel time to just three hours, offering a faster and more comfortable alternative to road and air travel. This development is seen as a major step toward modernizing the country’s infrastructure and enhancing connectivity across regions.
      
      Beyond convenience, the high-speed train is expected to significantly boost both domestic and international tourism. With easier access to Mombasa’s beaches and cultural attractions, more travelers are likely to explore Kenya’s coastal gems. Local businesses, from hotels to restaurants, anticipate increased demand as visitor numbers rise.
      
      Economically, the new rail line is projected to strengthen trade between Nairobi and the coastal region by facilitating quicker transportation of goods. Experts believe this project could serve as a model for other African countries seeking to modernize their transport systems. By investing in advanced infrastructure, Kenya is not only improving mobility but also laying the groundwork for stronger economic growth and regional integration.
        `,
        featured_image_url: "https://images.pexels.com/photos/3829176/pexels-photo-3829176.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 5,
        author: "Staff Writer",
        is_featured: false,
        status: "published",
        published_at: "2024-08-15T09:00:00Z",
        created_at: "2024-08-15T09:00:00Z",
        updated_at: "2024-08-15T09:00:00Z"
      },
      {
        id: 2,
        title: "E-Visa System Simplifies Travel Across Africa",
        slug: "e-visa-system-simplifies-travel-across-africa",
        excerpt: "More African countries adopt digital visa systems to ease cross-border movement for business and tourism.",
        content: `
      The adoption of e-visa systems across Africa is rapidly transforming the way travelers move between countries on the continent. By replacing lengthy paperwork and embassy visits with simple online applications, more governments are embracing technology to modernize border control and promote tourism. For business travelers and tourists alike, this shift means greater convenience, reduced costs, and faster approvals.
      
      In recent years, countries such as Kenya, Nigeria, Rwanda, and South Africa have rolled out digital visa platforms, with more expected to follow. These systems allow applicants to upload required documents, pay fees electronically, and receive their travel authorization by email—all within days instead of weeks. Experts note that the move toward e-visas also enhances security by enabling governments to better track travelers and screen applicants in real time.
      
      For Africa’s growing tourism and business sectors, the spread of e-visa systems could be a game changer. Easier cross-border movement will help foster regional integration, support intra-African trade, and attract more international visitors. As digital transformation continues, travelers can expect a future where exploring multiple African destinations becomes as seamless as booking a single trip online.
        `,
        featured_image_url: "https://images.pexels.com/photos/799463/pexels-photo-799463.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 5,
        author: "Staff Writer",
        is_featured: false,
        status: "published",
        published_at: "2024-08-15T12:00:00Z",
        created_at: "2024-08-15T12:00:00Z",
        updated_at: "2024-08-15T12:00:00Z"
      },
      {
        id: 3,
        title: "Electric Buses Transform Urban Mobility",
        slug: "electric-buses-transform-urban-mobility",
        excerpt: "Cities like Lagos and Kigali are introducing electric buses to reduce pollution and modernize public transport.",
        content: `
      Urban centers across Africa are witnessing a transportation revolution as cities like Lagos, Nigeria, and Kigali, Rwanda, introduce electric buses to their public transit fleets. This shift toward cleaner, more sustainable mobility solutions aims to reduce air pollution, lower greenhouse gas emissions, and provide residents with modern, efficient transportation options.
        `,
        featured_image_url: "https://images.pexels.com/photos/2528369/pexels-photo-2528369.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 5,
        author: "Staff Writer",
        is_featured: false,
        status: "published",
        published_at: "2024-08-15T14:00:00Z",
        created_at: "2024-08-15T14:00:00Z",
        updated_at: "2024-08-15T14:00:00Z"
      },
      {
        id: 4,
        title: "Africa’s Low-Cost Airlines Expand Routes",
        slug: "africas-low-cost-airlines-expand-routes",
        excerpt: "Budget carriers are making inter-African travel more affordable, connecting secondary cities directly.",
        content: `
      Africa's aviation landscape is undergoing a significant transformation as low-cost airlines expand their route networks, making inter-African travel more accessible and affordable. Budget carriers such as Fastjet, Jambojet, and Air Peace are pioneering direct connections between secondary cities that were previously underserved by traditional airlines. This expansion is not only boosting tourism but also facilitating business travel and regional integration.
        `,
        featured_image_url: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 5,
        author: "Staff Writer",
        is_featured: false,
        status: "published",
        published_at: "2024-08-14T08:00:00Z",
        created_at: "2024-08-14T08:00:00Z",
        updated_at: "2024-08-14T08:00:00Z"
      },
      {
        id: 5,
        title: "Smart Border Tech Speeds Up Checkpoints",
        slug: "smart-border-tech-speeds-up-checkpoints",
        excerpt: "Biometric systems and digital IDs are being deployed to make border crossings faster and safer.",
        content: `
      African nations are increasingly adopting smart border technologies to streamline cross-border movement and enhance security. From biometric scanners and facial recognition to digital identity systems, these tools are designed to reduce long queues, improve traveler verification, and curb illegal activities.  
      
      By integrating technology into border management, countries are not only making checkpoints more efficient but also strengthening regional trade and tourism. Travelers can expect faster clearance times, while governments gain stronger capabilities to monitor movement and ensure safety.
        `,
        featured_image_url: "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 5,
        author: "Staff Writer",
        is_featured: false,
        status: "published",
        published_at: "2024-08-13T10:00:00Z",
        created_at: "2024-08-13T10:00:00Z",
        updated_at: "2024-08-13T10:00:00Z"
      },
      {
        id: 6,
        title: "African Startups Attract Record-Breaking Investments in 2025",
        slug: "african-startups-attract-record-breaking-investments-2025",
        excerpt: "Venture capital funding for African startups has surged past $8 billion this year, with fintech, agritech, and healthtech companies leading the way. Investors highlight Africa’s young population and digital adoption as key growth drivers.",
        content: `African startups are experiencing unprecedented momentum in 2025, with venture capital inflows surpassing the $8 billion mark for the first time. The surge in funding reflects growing investor confidence in the continent’s innovation ecosystem, driven by rapid digital adoption, a young and entrepreneurial population, and expanding internet penetration. Sectors such as fintech, agritech, and healthtech continue to dominate, attracting global and regional investors eager to tap into Africa’s unique market opportunities.  
      
      Fintech remains the frontrunner, accounting for nearly half of the total funding. Startups offering digital banking, mobile payments, and blockchain-powered solutions are scaling rapidly, fueled by Africa’s need for inclusive financial services. Agritech firms are also drawing strong interest as they introduce technology-driven solutions to boost food security and modernize farming. Meanwhile, healthtech innovators are leveraging AI and telemedicine to bridge healthcare access gaps, particularly in underserved rural areas.  
      
      Industry experts note that the influx of capital is not only reshaping local economies but also positioning Africa as a key player in the global startup landscape. Governments across the continent are stepping up efforts to create investor-friendly environments by streamlining regulations, improving infrastructure, and supporting digital literacy initiatives. Analysts predict that if the current trajectory continues, Africa could emerge as one of the fastest-growing hubs for technological innovation by the end of the decade.`,
        featured_image_url: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 6,
        author: "David Okoro",
        is_featured: false,
        status: "published",
        published_at: "2025-09-06T07:00:00Z",
        created_at: "2025-09-06T07:00:00Z",
        updated_at: "2025-09-06T07:00:00Z",
      },
      {
        id: 7,
        title: "Remote Work Opens New Opportunities for African Professionals",
        slug: "remote-work-opens-new-opportunities-for-african-professionals",
        excerpt: "Global firms are increasingly hiring African talent for remote roles, thanks to improved internet infrastructure and co-working spaces across major cities. This shift is allowing skilled workers to access international job markets without leaving home.",
        content: `The rise of remote work is transforming career opportunities for African professionals, as global companies increasingly tap into the continent’s skilled workforce. Improvements in internet infrastructure, widespread adoption of digital collaboration tools, and the growth of co-working spaces in cities like Nairobi, Lagos, and Cape Town have made it easier than ever for Africans to compete in the international job market. This shift is helping professionals access high-paying roles without the need to relocate abroad.  
      
      Many of the remote opportunities are emerging in fields such as software development, digital marketing, customer support, and data analysis, where African talent is already gaining global recognition. Startups and multinational corporations alike are leveraging this trend, with some firms even setting up remote-first teams that span multiple African countries. The growing acceptance of flexible work arrangements is enabling more young professionals to build careers while contributing to the global economy from their home countries.  
      
      Beyond individual benefits, the rise of remote work is also reshaping local economies. Increased access to global income streams is fueling demand for better infrastructure, fintech solutions, and localized services that support remote workers. Analysts believe this could create ripple effects, encouraging more investment in Africa’s digital ecosystem while reducing brain drain, as talent can now work for international firms without emigrating. If sustained, the remote work boom could become a cornerstone of Africa’s economic growth in the coming decade.`,
        featured_image_url: "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 6,
        author: "Lydia Njoroge",
        is_featured: false,
        status: "published",
        published_at: "2025-09-06T10:00:00Z",
        created_at: "2025-09-06T10:00:00Z",
        updated_at: "2025-09-06T10:00:00Z",
      },
      {
        id: 8,
        title: "Agribusiness Ventures Drive Job Creation in Rural Areas",
        slug: "agribusiness-ventures-drive-job-creation-rural-areas",
        excerpt: "Innovative agribusiness startups are empowering smallholder farmers through access to markets, mobile financing, and modern equipment. This wave of entrepreneurship is creating thousands of jobs while improving food security across the continent.",
        content: `Agribusiness is emerging as a key driver of rural development in Africa, providing both employment opportunities and sustainable income streams for local communities. With rising demand for food across the continent and beyond, entrepreneurs are investing in ventures such as commercial farming, food processing, and value-added agricultural products. These investments are not only increasing productivity but also offering rural populations new pathways to economic empowerment.  
      
      Many young people, previously migrating to urban areas in search of work, are now finding opportunities closer to home through agribusiness initiatives. Startups are leveraging technology to improve farming practices, from mobile platforms that connect farmers to markets, to drones and AI solutions that optimize crop yields. Women and youth, often underrepresented in traditional agriculture, are increasingly at the forefront of these ventures, contributing to both job creation and community development.  
      
      Experts note that agribusiness is also strengthening food security while reducing dependence on imports. Governments and development partners are supporting the sector through training programs, financing options, and infrastructure development, ensuring that rural areas are not left behind in Africa’s economic transformation. If these trends continue, agribusiness could become a cornerstone of inclusive growth, creating millions of jobs and revitalizing rural economies across the continent.`,
        featured_image_url: "https://images.pexels.com/photos/2887792/pexels-photo-2887792.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 6,
        author: "Samuel Mensah",
        is_featured: false,
        status: "published",
        published_at: "2025-09-06T13:00:00Z",
        created_at: "2025-09-06T13:00:00Z",
        updated_at: "2025-09-06T13:00:00Z",
      },
      
      {
        id: 9,
        title: "Tech Hubs Across Africa Expand Rapidly",
        slug: "tech-hubs-across-africa-expand-rapidly",
        excerpt: "From Lagos to Nairobi to Cape Town, innovation hubs are growing as key meeting points for entrepreneurs, investors, and developers. These ecosystems are not only fueling startups but also reshaping local economies by boosting job creation.",
        content: `Africa’s technology ecosystem is experiencing unprecedented growth, with innovation hubs sprouting across major cities such as Lagos, Nairobi, Johannesburg, Kigali, and Cape Town. These spaces serve as critical meeting points for entrepreneurs, investors, and developers, offering the resources and networks needed to transform ideas into viable businesses. With governments, private investors, and global tech companies all investing in the ecosystem, tech hubs are becoming powerful engines of innovation and economic transformation.  
      
      One of the key roles of these hubs is providing early-stage startups with mentorship, training, and access to funding. By offering shared office spaces, incubation programs, and links to venture capital, they lower barriers to entry for young entrepreneurs. Many of these hubs also focus on addressing Africa-specific challenges, from financial inclusion and e-commerce logistics to renewable energy and agricultural technology, ensuring that innovation has a direct impact on local communities.  
      
      Beyond supporting startups, the rapid expansion of tech hubs is fueling job creation and skills development. Young professionals are gaining opportunities to work on groundbreaking projects, while universities and training institutes are partnering with hubs to align education with market demands. Analysts predict that if this momentum continues, Africa could soon establish itself as a global innovation hotspot, reshaping not only local economies but also how the world views the continent’s role in technology and entrepreneurship.`,
        featured_image_url: "https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 6,
        author: "Joseph Mwangi",
        is_featured: false,
        status: "published",
        published_at: "2025-09-05T08:00:00Z",
        created_at: "2025-09-05T08:00:00Z",
        updated_at: "2025-09-05T08:00:00Z",
      },
      {
        id: 10,
        title: "Green Economy Creates New Employment Pathways",
        slug: "green-economy-creates-new-employment-pathways",
        excerpt: "Africa’s renewable energy sector is expanding fast, generating jobs in solar installation, wind farms, and sustainable construction. Experts say the green economy could employ millions over the next decade, while reducing reliance on fossil fuels.",
        content: `Africa’s transition toward a green economy is accelerating, creating thousands of new jobs in renewable energy, sustainable construction, and eco-friendly industries. With rising demand for clean power, governments and private investors are channeling resources into large-scale solar farms, wind energy projects, and mini-grid solutions that bring electricity to rural communities. This wave of investment is not only addressing energy shortages but also providing much-needed employment for the continent’s young workforce.  
      
      Across major cities and rural areas alike, opportunities are emerging in solar panel installation, equipment maintenance, and sustainable housing projects. Vocational training centers and universities are beginning to adapt their programs to equip graduates with skills tailored to the green economy, ensuring that more Africans can participate in this fast-growing sector. Women and youth are particularly benefiting from these initiatives, with many joining renewable energy cooperatives and startups that are reshaping local economies.  
      
      Experts predict that the green economy could employ millions of Africans over the next decade, while simultaneously reducing the continent’s reliance on fossil fuels. Beyond the economic benefits, this shift is helping countries meet their climate commitments and build resilience against environmental challenges such as droughts and floods. By embracing sustainability as a core part of development, Africa is positioning itself as a leader in the global fight against climate change while unlocking new pathways to prosperity.`,
        featured_image_url: "https://images.pexels.com/photos/885350/pexels-photo-885350.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 6,
        author: "Fatima Diallo",
        is_featured: false,
        status: "published",
        published_at: "2025-09-04T09:00:00Z",
        created_at: "2025-09-04T09:00:00Z",
        updated_at: "2025-09-04T09:00:00Z",
      },
      {
        id: 11,
        title: "Africa Tech Summit 2025 Kicks Off in Nairobi",
        slug: "africa-tech-summit-2025-kicks-off-in-nairobi",
        excerpt: "Over 3,000 innovators, investors, and policymakers are gathering in Nairobi for the Africa Tech Summit. The event will showcase cutting-edge startups and explore the future of AI, fintech, and sustainable technology across the continent.",
        content: `The highly anticipated Africa Tech Summit 2025 has officially opened in Nairobi, drawing more than 3,000 innovators, investors, policymakers, and tech enthusiasts from around the world. The summit has become one of the continent’s premier platforms for showcasing groundbreaking startups, discussing emerging trends, and forging partnerships that drive Africa’s digital transformation. This year’s edition is expected to highlight advancements in artificial intelligence, fintech, agritech, and green technology.  
      
      Speakers include leading entrepreneurs, venture capitalists, and government representatives who will share insights on how Africa can harness technology to address challenges such as financial inclusion, food security, and climate resilience. Startup showcases and pitch competitions are also on the agenda, giving founders an opportunity to connect with investors and scale their solutions beyond local markets. With Nairobi’s thriving tech ecosystem as the backdrop, the summit reflects the city’s growing reputation as a hub for innovation in Africa.  
      
      Beyond the sessions and exhibitions, the summit is fostering collaboration between African startups and international partners. Delegates are expected to sign deals that could unlock millions of dollars in investment for emerging companies across the continent. Organizers note that Africa Tech Summit 2025 is not only about showcasing technology but also about shaping policies and building ecosystems that enable long-term growth. The event underscores Africa’s rising influence in the global tech landscape and its potential to drive inclusive development through innovation.`,
        featured_image_url: "https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Grace Mbatha",
        is_featured: false,
        status: "published",
        published_at: "2025-09-06T09:00:00Z",
        created_at: "2025-09-06T09:00:00Z",
        updated_at: "2025-09-06T09:00:00Z",
      },
      {
        id: 12,
        title: "Youth Entrepreneurship Forum in Accra",
        slug: "youth-entrepreneurship-forum-accra",
        excerpt: "The annual Youth Entrepreneurship Forum brings together young business leaders and mentors to share ideas, success stories, and funding opportunities. This year’s theme focuses on digital transformation and building scalable ventures.",
        content: `Accra is hosting the annual Youth Entrepreneurship Forum, a flagship event that convenes young innovators, startup founders, mentors, and investors from across the continent. The forum provides a platform for sharing success stories, exchanging ideas, and showcasing ventures that are driving Africa’s economic growth. This year’s edition places a strong emphasis on digital transformation, highlighting how technology can enable youth-led businesses to scale and compete globally.  
      
      Workshops and panel discussions will explore critical topics such as access to funding, navigating regulatory landscapes, and leveraging digital tools to build resilient enterprises. Experienced entrepreneurs and mentors are engaging with participants to offer practical insights into overcoming common challenges faced by startups. Pitch sessions are also a key highlight, with several young founders presenting their innovative solutions to potential investors and partners.  
      
      Beyond inspiration and networking, the forum is expected to create tangible opportunities for collaboration and investment. Organizers hope the event will strengthen the pipeline of youth-led ventures across Africa, while empowering the next generation of entrepreneurs to tackle pressing challenges with scalable, tech-driven solutions. By focusing on digital transformation, the Youth Entrepreneurship Forum in Accra underscores the central role of Africa’s youth in shaping the continent’s future economy.`,
        featured_image_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Kwame Boateng",
        is_featured: false,
        status: "published",
        published_at: "2025-09-05T11:00:00Z",
        created_at: "2025-09-05T11:00:00Z",
        updated_at: "2025-09-05T11:00:00Z",
      },
      {
        id: 13,
        title: "Global Climate Action Conference in Cape Town",
        slug: "global-climate-action-conference-cape-town",
        excerpt: "Cape Town will host global leaders, scientists, and activists for the Climate Action Conference 2025. The event will address renewable energy adoption, water security, and Africa’s role in shaping global climate solutions.",
        content: `Cape Town is set to host the Global Climate Action Conference 2025, bringing together heads of state, climate scientists, industry leaders, and activists from around the world. The event aims to advance conversations on renewable energy adoption, sustainable water management, and Africa’s critical role in the global response to climate change. With climate challenges intensifying, organizers emphasize that the conference will provide a platform for actionable solutions rather than just dialogue.  
      
      Key sessions will focus on accelerating the transition to clean energy, tackling water scarcity, and supporting communities most vulnerable to environmental shocks. African nations are expected to showcase innovative projects ranging from large-scale solar farms and wind energy developments to community-led conservation initiatives. Experts will also explore how digital technologies, such as artificial intelligence and satellite monitoring, can help track emissions, manage resources, and improve resilience.  
      
      Beyond technical discussions, the conference is designed to foster collaboration between governments, private investors, and civil society. Several partnership announcements and funding commitments are expected, with a particular focus on ensuring that Africa secures the resources needed to achieve its climate goals. By hosting this global event, Cape Town is positioning itself as a leader in sustainability and reinforcing Africa’s voice in shaping the future of climate action worldwide.`,
        featured_image_url: "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Thabo van der Merwe",
        is_featured: false,
        status: "published",
        published_at: "2025-09-04T14:00:00Z",
        created_at: "2025-09-04T14:00:00Z",
        updated_at: "2025-09-04T14:00:00Z",
      },
      {
        id: 14,
        title: "African Women in Business Gala 2025",
        slug: "african-women-in-business-gala-2025",
        excerpt: "Celebrating women entrepreneurs, the gala highlights achievements in finance, healthcare, and tech. Attendees will also enjoy networking sessions, awards, and mentorship opportunities to inspire the next generation of leaders.",
        content: `The African Women in Business Gala 2025 is set to shine a spotlight on the remarkable achievements of women entrepreneurs and professionals across the continent. Hosted in Johannesburg, the event will bring together leaders from diverse industries including finance, healthcare, and technology. The gala not only celebrates individual success stories but also emphasizes the vital role women play in driving Africa’s economic growth and innovation.  
      
      Highlights of the evening will include panel discussions with top female executives, awards recognizing trailblazers in various sectors, and mentorship sessions aimed at nurturing the next generation of women leaders. Networking opportunities will allow attendees to connect with investors, policymakers, and fellow entrepreneurs, creating a powerful space for collaboration and growth. With representation from over 20 African countries, the gala serves as a continental platform for dialogue and inspiration.  
      
      Beyond recognition and celebration, the gala seeks to advance long-term empowerment by promoting access to funding, training, and professional networks for women-led businesses. Organizers stress that empowering women entrepreneurs is not only a matter of equity but also a proven strategy for accelerating sustainable development. The African Women in Business Gala 2025 stands as a testament to the continent’s commitment to inclusivity, innovation, and leadership for the future.`,
        featured_image_url: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Nandi Khumalo",
        is_featured: false,
        status: "published",
        published_at: "2025-09-03T18:00:00Z",
        created_at: "2025-09-03T18:00:00Z",
        updated_at: "2025-09-03T18:00:00Z",
      },
      {
        id: 15,
        title: "Pan-African Music & Culture Festival",
        slug: "pan-african-music-culture-festival",
        excerpt: "Artists, performers, and cultural leaders from across Africa will gather to celebrate the continent’s diverse heritage. The festival will include live music, food exhibitions, and cultural showcases promoting unity and creativity.",
        content: `The Pan-African Music & Culture Festival is set to bring together artists, performers, and cultural leaders from across the continent for a vibrant celebration of Africa’s rich heritage. Hosted in Dakar, Senegal, this year’s edition will feature live performances spanning traditional rhythms, contemporary Afrobeat, hip-hop, and fusion genres that reflect the creativity and diversity of Africa’s music scene. Beyond the stage, the festival aims to foster cultural pride, collaboration, and unity among African nations.  
      
      In addition to music, the festival will showcase Africa’s culinary richness through food exhibitions and tasting sessions highlighting local cuisines from East, West, North, Central, and Southern Africa. Art exhibitions, fashion showcases, and cultural workshops will provide attendees with immersive experiences that highlight the continent’s creative industries. These platforms are designed to empower artists and entrepreneurs, while also offering opportunities for cultural exchange with international guests.  
      
      Organizers emphasize that the festival is more than just an entertainment event—it is a movement to promote African identity on the global stage. By blending heritage with modern innovation, the Pan-African Music & Culture Festival seeks to position Africa as a cultural powerhouse while strengthening cross-border connections. The event is expected to draw thousands of visitors, boosting tourism and creating lasting economic and social impact in the host city and beyond.`,
        featured_image_url: "https://images.pexels.com/photos/33779/music-rock-band-live.jpg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Awa Diop",
        is_featured: false,
        status: "published",
        published_at: "2025-09-02T16:00:00Z",
        created_at: "2025-09-02T16:00:00Z",
        updated_at: "2025-09-02T16:00:00Z",
      },
      {
        id: 16,
        title: "Job and Career Expo 2025 in Johannesburg",
        slug: "job-career-expo-2025-johannesburg",
        excerpt: "Major corporations, startups, and recruitment firms will connect with job seekers at Africa’s largest career expo. Workshops on CV building, interview skills, and networking will provide practical guidance for young professionals.",
        content: `Johannesburg is set to host the Job and Career Expo 2025, Africa’s largest gathering of employers, recruiters, and job seekers. The event will bring together major corporations, startups, and recruitment agencies eager to connect with talented professionals from across the continent. With Africa’s youth unemployment challenge in focus, the expo aims to create pathways to meaningful careers while helping companies identify the next generation of skilled workers.  
      
      Alongside exhibition booths, the expo will feature interactive workshops on CV writing, interview preparation, and personal branding. Career coaches and HR specialists will provide one-on-one guidance, while panel sessions will highlight emerging job trends in fields such as technology, renewable energy, finance, and healthcare. Networking lounges will allow job seekers to engage directly with potential employers and industry leaders, opening doors to internships, full-time roles, and mentorship opportunities.  
      
      Organizers emphasize that the Job and Career Expo is not just about recruitment but also about long-term career development. By equipping attendees with practical tools and connecting them to real opportunities, the event hopes to empower young professionals to thrive in Africa’s evolving job market. With thousands expected to attend, the expo is poised to become a catalyst for employment growth and skills development across the region.`,
        featured_image_url: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
        category_id: 7,
        author: "Michael Dlamini",
        is_featured: false,
        status: "published",
        published_at: "2025-09-01T10:00:00Z",
        created_at: "2025-09-01T10:00:00Z",
        updated_at: "2025-09-01T10:00:00Z",
      },
          ];
          async function seed() {
            console.log("🌱 Seeding data...");
          
            // Add categories
            for (const cat of categories) {
              await addDoc(collection(db, "categories"), cat);
              console.log(`✅ Category: ${cat.name}`);
            }
          
            // Add articles
            for (const article of articles) {
              await addDoc(collection(db, "articles"), article);
              console.log(`✅ Article: ${article.title}`);
            }
          
            console.log("🌱 Seeding complete!");
            process.exit(0);
          }
          
          seed().catch((err) => {
            console.error("❌ Error seeding:", err);
            process.exit(1);
          });
          