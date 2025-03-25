export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  fullDescription: string;
  role: string;
  timeline: string;
  tools: string;
  overview: string[];
  process: {
    title: string;
    description: string;
  }[];
  images: string[];
  results: string;
}

export const projects: Project[] = [
  {
    id: "project1",
    title: "SaaS Pricing Optimization",
    category: "Product Management",
    description: "A strategic pricing overhaul for a SaaS platform that increased company revenue.",
    coverImage: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "A strategic pricing overhaul for a B2B SaaS platform that increased company revenue while providing better value to customers.",
    role: "Senior Product Manager",
    timeline: "4 months (2023)",
    tools: "Market Analysis, Pricing Strategy, User Interviews, Analytics",
    overview: [
      "Led a comprehensive pricing strategy overhaul for a B2B SaaS platform struggling with pricing that didn't align with customer value perception and usage patterns.",
      "The challenge was to create a pricing structure that would increase revenue while providing better value alignment for different customer segments."
    ],
    process: [
      {
        title: "Customer Research",
        description: "I conducted extensive interviews with current and churned customers to understand value perception, usage patterns, and price sensitivity across different segments."
      },
      {
        title: "Competitive Analysis",
        description: "I analyzed competitor pricing strategies and market positioning to identify opportunities for differentiation and value-based pricing approaches."
      },
      {
        title: "Value Metric Identification",
        description: "I worked with the data team to identify metrics that accurately reflected the value customers received from the product, ensuring pricing aligned with actual value delivery."
      },
      {
        title: "Testing & Implementation",
        description: "I designed and implemented a phased rollout strategy with grandfathering options for existing customers, monitoring key retention and revenue metrics throughout the transition."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598732729203-566633b3ae81?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "The new pricing strategy resulted in a 22% increase in annual recurring revenue (ARR) within 6 months, with customer retention rates remaining stable despite the changes. Customer satisfaction surveys showed improved value perception across all segments."
  },
  {
    id: "project2",
    title: "SaaS CSAT increase 15%",
    category: "Product Management",
    description: "A customer satisfaction improvement initiative that significantly boosted CSAT scores.",
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "Implemented a strategic customer satisfaction initiative that increased CSAT scores by 15% for a B2B SaaS platform.",
    role: "Product Manager",
    timeline: "6 months (2022)",
    tools: "User Research, Journey Mapping, A/B Testing, Analytics",
    overview: [
      "Led a comprehensive CSAT improvement initiative for a B2B SaaS platform that was experiencing declining customer satisfaction and increased churn.",
      "The challenge was to identify and address key pain points in the customer journey, improve product experience, and create more responsive customer support processes."
    ],
    process: [
      {
        title: "Pain Point Analysis",
        description: "I conducted extensive customer interviews and analyzed support tickets to identify the most critical pain points affecting customer satisfaction."
      },
      {
        title: "Experience Mapping",
        description: "I created detailed customer journey maps to visualize touchpoints and moments of friction throughout the entire customer lifecycle."
      },
      {
        title: "Solution Prioritization",
        description: "I developed a prioritized roadmap of experience improvements based on impact potential and implementation complexity."
      },
      {
        title: "Implementation & Measurement",
        description: "I worked across product, engineering, and customer success teams to implement changes and establish ongoing measurement of CSAT metrics."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "The customer satisfaction initiative achieved a 15% increase in CSAT scores over a 6-month period. Churn rate decreased by 12%, and customer lifetime value increased by 18% as a result of the improvements to product experience and support processes."
  },
  {
    id: "project3",
    title: "ModernShop",
    category: "E-commerce",
    description: "A modern e-commerce platform with a focus on minimalist design and seamless user experience.",
    coverImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "A modern e-commerce platform with a focus on minimalist design and seamless user experience from browsing to checkout.",
    role: "Product Designer",
    timeline: "6 months (2023)",
    tools: "Figma, Principle, UserTesting",
    overview: [
      "ModernShop is an e-commerce platform that combines minimalist design with powerful functionality to create a seamless shopping experience for customers and an efficient management system for merchants.",
      "The main challenge was to simplify the typical e-commerce journey while maintaining all the necessary features and information that shoppers need to make purchase decisions."
    ],
    process: [
      {
        title: "Market Analysis",
        description: "I analyzed competing e-commerce platforms to identify opportunities for differentiation and improvement."
      },
      {
        title: "User Journey Mapping",
        description: "I mapped out the entire customer journey from discovery to post-purchase to identify pain points and opportunities for enhancement."
      },
      {
        title: "Prototyping",
        description: "I created interactive prototypes for key user flows, including product browsing, filtering, cart management, and checkout."
      },
      {
        title: "Design System",
        description: "I developed a comprehensive design system to ensure consistency across all platform touchpoints and facilitate future development."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "ModernShop has seen a 35% higher conversion rate compared to industry standards, with customers specifically praising the intuitive navigation and streamlined checkout process."
  },
  {
    id: "project4",
    title: "SecurePay",
    category: "Fintech",
    description: "A secure payment application with a focus on user security and transaction transparency.",
    coverImage: "https://images.unsplash.com/photo-1534670007418-bc50e48fe69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "A secure payment application with a focus on user security, transaction transparency, and seamless payment experience.",
    role: "UX/UI Designer",
    timeline: "5 months (2022)",
    tools: "Figma, Adobe XD, InVision",
    overview: [
      "SecurePay is a financial technology application that enables secure, transparent transactions between individuals and businesses, with a special emphasis on security and user trust.",
      "The key challenge was balancing stringent security requirements with usability to ensure users feel confident in the platform while enjoying a frictionless experience."
    ],
    process: [
      {
        title: "Security Research",
        description: "I worked with security experts to understand industry best practices and how to translate them into user-friendly design patterns."
      },
      {
        title: "Interaction Design",
        description: "I designed intuitive interaction patterns for complex processes like authentication, transaction verification, and account management."
      },
      {
        title: "Visual Design",
        description: "I created a visual language that communicates trust, security, and professionalism while maintaining a modern aesthetic."
      },
      {
        title: "Usability Testing",
        description: "I conducted extensive usability testing to ensure security features did not negatively impact the user experience."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579621970590-9d624316904b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "SecurePay has achieved an excellent security rating while maintaining a high user satisfaction score. The app has been recognized for making complex security concepts accessible to everyday users."
  },
  {
    id: "project5",
    title: "QuickBite",
    category: "Food & Beverage",
    description: "A food delivery application that connects users with local restaurants for seamless ordering.",
    coverImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "A food delivery application that connects users with local restaurants, offering seamless ordering, real-time tracking, and personalized recommendations.",
    role: "Product Designer",
    timeline: "4 months (2023)",
    tools: "Figma, Framer, Optimal Workshop",
    overview: [
      "QuickBite is a food delivery platform that connects hungry users with local restaurants, providing a streamlined ordering process, real-time delivery tracking, and personalized recommendations.",
      "The challenge was to create an engaging, efficient ordering process that works well even during peak usage times and accommodates a wide variety of menu structures and restaurant types."
    ],
    process: [
      {
        title: "Competitive Analysis",
        description: "I analyzed existing food delivery apps to identify strengths to incorporate and pain points to solve in our design."
      },
      {
        title: "User Personas",
        description: "I developed detailed user personas representing different customer segments with varying needs and preferences."
      },
      {
        title: "Visual System",
        description: "I created a visual system that makes food imagery the hero while ensuring that important information and actions remain clear and accessible."
      },
      {
        title: "Prototype Testing",
        description: "I conducted testing sessions with users ordering from actual restaurants to refine the ordering process and delivery tracking features."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "QuickBite has achieved a 28% higher order completion rate compared to industry standards, with users specifically praising the intuitive ordering process and helpful restaurant recommendations."
  },
  {
    id: "project6",
    title: "ConnectHub",
    category: "Social",
    description: "A social networking platform designed to foster meaningful connections among professionals.",
    coverImage: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    fullDescription: "A social networking platform designed to foster meaningful connections among professionals with shared interests and career goals.",
    role: "UX Lead",
    timeline: "7 months (2022)",
    tools: "Figma, Miro, Lookback",
    overview: [
      "ConnectHub is a professional social networking platform that helps users build meaningful connections based on shared professional interests, skills, and career goals rather than superficial interactions.",
      "The main challenge was designing an experience that encourages substantive interaction and relationship-building in a digital space often dominated by superficial engagement."
    ],
    process: [
      {
        title: "User Research",
        description: "I conducted extensive research into professionals' networking needs and frustrations with existing platforms."
      },
      {
        title: "Content Strategy",
        description: "I worked with content strategists to develop guidelines and features that encourage meaningful exchanges rather than broadcast-style posting."
      },
      {
        title: "Interaction Design",
        description: "I designed interaction patterns that facilitate genuine connection and collaboration between professionals."
      },
      {
        title: "Usability Studies",
        description: "I ran multiple rounds of usability studies to refine the connection and communication features."
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1541943181603-d8fe267a5dcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    results: "ConnectHub has seen impressive growth with users reporting 3x more meaningful professional connections compared to other networking platforms they've used."
  }
];
