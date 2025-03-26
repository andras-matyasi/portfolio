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
    id: "pricing-kameleo",
    active: true,
    title: "Pricing Strategy",
    type: "SaaS",
    shortText: "Enabling users to capture more value and increasing revenue with pricing change at Kameleo.",
    image: "/images/case-studies/pricing-case-study.png",
    problem: "Seat-based pricing provided bad scaling for teams and heavy API users.",
    solution: "Redesigned packages so team members and API usage became more scalable add-ons.",
    success: "4x team members in 2 months, extra API usage is the top grossing add-on, total revenue increased by 8%",
    keyLearnings: [
      "Do your research, but don't be afraid to change the pricing.",
      "Designing pricing should be a cross-company effort, each team have invaluable input.", 
      "Creating your own pricing flavor, aligned with your product strategy beats copying competitors. Be the best option for your ICP." 
    ]
  },
  {
    id: "project2",
    active: true,
    title: "SaaS CSAT Improvement",
    type: "Product Management",
    shortText: "A customer satisfaction initiative that increased CSAT scores by 15% for a B2B SaaS platform.",
    image: "/images/case-studies/saas-csat-improvement.jpg",
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
    image: "/images/case-studies/modernshop-ecommerce.jpg",
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
    image: "/images/case-studies/securepay-payment-app.jpg",
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
    image: "/images/case-studies/quickbite-food-delivery.jpg",
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
    image: "/images/case-studies/connecthub-networking.jpg",
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
