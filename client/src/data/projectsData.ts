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
    title: "SaaS Pricing Strategy",
    type: "SaaS",
    shortText: "Switch from seat-based pricing to add-on based pricing. This enabled users to capture more value and increase revenue with pricing change at Kameleo.",
    image: "/images/case-studies/pricing-case-study.png",
    problem: "Seat-based pricing provided bad scaling for teams and heavy API users.",
    solution: "Redesigned packages so team members and API usage became more scalable add-ons.",
    success: "4x team members in 2 months, extra API usage is the top grossing add-on.",
    keyLearnings: [
      "Do your research, but don't be afraid to change the pricing.",
      "Designing pricing should be a cross-company effort, each team have invaluable input.", 
      "Creating your own pricing flavor, aligned with your product strategy beats copying competitors. Be the best option for your ICP." 
    ]
  },
  {
    id: "csat-kameleo",
    active: true,
    title: "SaaS Activation Boost",
    type: "SaaS",
    shortText: "Shorter time to AHA moment to increase activation and satisfaction.",
    image: "/images/case-studies/activation-case-study.png",
    problem: "User research indicated the new customers, especially those who switch from competitors have lower satisfaction than older customers. After watching session replays, user interviews and competitor analysis, a pattern emerged: the core flow is hard to comprehend for new customers.",
    solution: "Prototypes were created and user tested to find a better performing flow. Change was implemented to the frontend and API.",
    success: "Activation increased by 7% and CSAT for new customers increased by 15%.",
    keyLearnings: [
      "Simple interfaces work better.",
      "Avoid complex and proprietary filtering logic on the UI."
    ]
  },
  {
    id: "retention-kameleo",
    active: true,
    title: "SaaS Retention Improvement",
    type: "SaaS",
    shortText: "Focused on improving the core value prop with a technical project, which led to better user retention.",
    image: "/images/case-studies/retention-case-study.png",
    problem: "Declining retention curve",
    solution: "Improved Kameleo's browsers to offer better fingerprinting protection.",
    success: "3 percentage point improvement in month 2 retention, flattening retention curve.",
    keyLearnings: [
      "Nail it then scale it. Solve the core problem before adding on additional features and platforms.",
      "Browser-based services change fast. Dedicate continuous effort to your core value proposition for a browser-based company."
    ]
  },
  {
    id: "continuous-user-research",
    active: true,
    title: "Continuous User Research Framework",
    type: "SaaS",
    shortText: "How to continuously source candidates as a single product manager at a bootstrapped company",
    image: "/images/case-studies/user-research-case-study.png",
    problem: "Hard to source quality candidates if you have a small customer pool if you have non-English native customers.",
    solution: "Discord community building, async user testing and value-based sourcing from support.",
    success: "Quality candidates from the ICPs.",
    keyLearnings: [
      "Nail it then scale it. Solve the core problem before adding on additional features and platforms.",
      "Increasing cash reward increases the number of interviews, but the best interviews talked to us for free or for additional product usage.",
      "Async interviews require careful planning. It's unlikely to be the number one source, but enables users who are less likely to book a call.",
      "Timing is crucial for success: best success rates were after signup (if the activity is high), package change or after successful support interaction.",
      "Create a (Discord) community to help with sourcing."
    ]
  },
  {
    id: "swapp",
    active: true,
    title: "Swapp",
    type: "Marketplace",
    shortText: "0 to 1 with new car subscription platform in EU and Middle East.",
    image: "/images/case-studies/swapp-case-study.png",
    problem: "Launch a new company, find PMF and traction than scale.",
    solution: "Experimentation and growing through partnerships until traction: shipped 2 MVPs (car subscription and daily car rental for extra monetization). Launched in 3 cities, 1 sticked. Partnered up with Careem to source new customers through their superapp.",
    success: "Achieved PMF in Dubai.",
    keyLearnings: [
      "From 0 to 1 you need to ship and experiment fast.",
      "Done is better than perfect.",
      "The chicken or the egg problem: a 2 sided marketplace needs constant growth on both sides."
    ]
  },
  {
    id: "profession-onboarding",
    active: true,
    title: "Onboarding Flow for Passive Job Search",
    type: "Job board",
    shortText: "Increase high quality jobseekers by 25% on the platform",
    image: "/images/case-studies/onboarding-case-study.png",
    problem: "Job applicants churned when they were asked to create a data-rich profile to be discovered in Hungary's leading job platform.",
    solution: "Created a progressive onboarding flow and asked for bite-sized data after each job application. After 5 applications, the profile was data-rich. ",
    success: "Increased data rich profiles to half a million from 400k in 2 months.",
    keyLearnings: [
      "Introduce the right (low) amount of friction to get more data-rich profiles.",
      "One applicant will likely apply 7 times on the platform. That's plenty of occasion to ask for bite-sized information about their profile."
    ]
  },
  {
    id: "profession-reviews",
    active: true,
    title: "Company Reviews for profession.hu (job board)",
    type: "Job board",
    shortText: "The story of turning a struggling product to a striving feature.",
    image: "/images/case-studies/reviews-case-study.png",
    problem: "Company reviews was a secondary product (to the job board) with low brand awareness. Paid was the only channel for acquisition, the product has low engagement and resource intensive to keep alive. However, user feedback was very positive, as it was a rare thing to find reviews about companies at the time (in the local market in Hungary).",
    solution: "Sunset the individual product. Launched a company reviews as a new feature for the job board, with access to the customer base. Provided a native interface to review companies 1 click away from you online CV, and created a simple email automation flow.",
    success: "30% of the job board's ads had at least 5 parametric reviews (true/false statements and star ratings) within 3 months. Ads from rated companies performed better compared to non-rated companies and organic traffic increased.",
    keyLearnings: [
      "If a feature or product is struggling, sunset it, no matter how much money you spent on it. Free up company resources to something that actually delivers.",
      "Creating reviews about the companies that pay you, and what makes a difference for the end user is hard. Stay positive and invest time in simple but effective rules and moderation.",
      "The company needs to be aligned to be able to pull such a project. As a PM, be good friends with sales before trying to change the world."
    ]
  }
];
