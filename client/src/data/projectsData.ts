export interface Project {
  id: string;
  active: boolean; // On-off switch to show/hide the project
  title: string;
  type: string;
  shortText: string;
  image: string;
  problem: string;
  solution: string;
  success: string;
  keyLearnings: string[];
}

export const projects: Project[] = [
  {
    id: "project1",
    active: true,
    title: "SaaS Pricing Optimization",
    type: "Product Management",
    shortText: "A strategic pricing overhaul for a SaaS platform that increased company revenue.",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "The B2B SaaS platform struggled with pricing that didn't align with customer value perception and usage patterns, causing revenue leakage and customer confusion about the value proposition.",
    solution: "I led a comprehensive pricing strategy overhaul by conducting customer interviews, analyzing competitor pricing, identifying true value metrics, and implementing a phased rollout with grandfathering options for existing customers.",
    success: "The new pricing strategy resulted in a 22% increase in annual recurring revenue (ARR) within 6 months, with customer retention rates remaining stable despite the changes. Customer satisfaction surveys showed improved value perception across all segments.",
    keyLearnings: [
      "Value-based pricing significantly outperforms cost-plus or competitor-based approaches for SaaS products",
      "Grandfathering existing customers during pricing changes is critical for maintaining loyalty",
      "Pricing should be tied to specific customer usage patterns and value metrics",
      "Cross-functional collaboration is essential when implementing pricing changes"
    ]
  },
  {
    id: "project2",
    active: true,
    title: "SaaS CSAT Improvement",
    type: "Product Management",
    shortText: "A customer satisfaction initiative that increased CSAT scores by 15% for a B2B SaaS platform.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "The B2B SaaS platform was experiencing declining customer satisfaction and increased churn due to unresolved pain points in the customer journey, inconsistent product experiences, and slow customer support processes.",
    solution: "I conducted extensive customer interviews and analyzed support tickets to identify critical pain points, created detailed customer journey maps, developed a prioritized roadmap of experience improvements, and worked across teams to implement changes.",
    success: "The customer satisfaction initiative achieved a 15% increase in CSAT scores over a 6-month period. Churn rate decreased by 12%, and customer lifetime value increased by 18% as a result of the improvements to product experience and support processes.",
    keyLearnings: [
      "Proactive customer experience improvement is more effective than reactive issue resolution",
      "Cross-functional alignment is crucial when addressing customer experience challenges",
      "Quantifying experience issues helps prioritize improvements that deliver the most value",
      "Continuous measurement of CSAT provides early warning signals for potential issues"
    ]
  },
  {
    id: "project3",
    active: false,
    title: "ModernShop E-commerce Platform",
    type: "E-commerce",
    shortText: "A modern e-commerce platform with minimalist design and seamless user experience from browsing to checkout.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "Traditional e-commerce platforms were overwhelming users with complex interfaces, information overload, and convoluted checkout processes, leading to cart abandonment and frustration.",
    solution: "I analyzed competing platforms, mapped the entire customer journey, created interactive prototypes for key user flows, and developed a comprehensive design system that prioritized simplicity while maintaining necessary functionality.",
    success: "ModernShop has seen a 35% higher conversion rate compared to industry standards, with customers specifically praising the intuitive navigation and streamlined checkout process.",
    keyLearnings: [
      "Minimalist design principles can significantly improve conversion rates in e-commerce",
      "A robust design system is essential for maintaining consistency as the platform scales",
      "User testing during the prototyping phase reveals critical friction points before launch",
      "Balancing simplicity with functionality requires constant refinement based on user feedback"
    ]
  },
  {
    id: "project4",
    active: true,
    title: "SecurePay Payment Application",
    type: "Fintech",
    shortText: "A secure payment application focused on user security, transaction transparency, and seamless experience.",
    image: "https://images.unsplash.com/photo-1534670007418-bc50e48fe69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "Users were hesitant to adopt digital payment solutions due to security concerns, complexity of financial transactions, and lack of transparency in how their financial data was being handled.",
    solution: "I worked with security experts to translate best practices into user-friendly designs, created intuitive interaction patterns for complex processes, developed a visual language communicating trust, and conducted extensive usability testing.",
    success: "SecurePay has achieved an excellent security rating while maintaining a high user satisfaction score. The app has been recognized for making complex security concepts accessible to everyday users.",
    keyLearnings: [
      "Security and usability can coexist with thoughtful design thinking",
      "Visual cues that reinforce security help build user confidence in financial applications",
      "Progressive disclosure helps users understand complex financial processes",
      "Regular security-focused user testing reveals how users perceive security features"
    ]
  },
  {
    id: "project5",
    active: true,
    title: "QuickBite Food Delivery",
    type: "Food & Beverage",
    shortText: "A food delivery app connecting users with local restaurants through seamless ordering and tracking.",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "Existing food delivery platforms were causing frustration with complicated interfaces, unreliable delivery tracking, and difficulty in comparing menu options, leading to order abandonment.",
    solution: "I analyzed existing food delivery apps, developed detailed user personas, created a visual system with food imagery as the hero, and conducted testing sessions with users ordering from actual restaurants.",
    success: "QuickBite has achieved a 28% higher order completion rate compared to industry standards, with users specifically praising the intuitive ordering process and helpful restaurant recommendations.",
    keyLearnings: [
      "Food imagery is the primary decision driver in food delivery applications",
      "Real-time tracking significantly reduces anxiety during the delivery process",
      "Personalized recommendations based on ordering history increase average order value",
      "Optimizing for peak usage times is critical for food delivery applications"
    ]
  },
  {
    id: "project6",
    active: true,
    title: "ConnectHub Networking Platform",
    type: "Social",
    shortText: "A professional networking platform designed for meaningful connections beyond superficial interactions.",
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    problem: "Professional networking platforms were encouraging superficial connections and broadcast-style communications rather than meaningful professional relationships and genuine knowledge exchange.",
    solution: "I researched professionals' networking needs, worked with content strategists on guidelines encouraging meaningful exchanges, designed interaction patterns facilitating genuine connection, and ran multiple usability studies.",
    success: "ConnectHub has seen impressive growth with users reporting 3x more meaningful professional connections compared to other networking platforms they've used.",
    keyLearnings: [
      "Designing for quality over quantity in social interactions creates more user value",
      "Content guidelines significantly influence how users interact on a platform",
      "Social friction can be positive when it encourages more thoughtful interactions",
      "Community norms are established early and difficult to change once established"
    ]
  }
];
