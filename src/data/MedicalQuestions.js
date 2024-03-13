/// types
// YN - questions with only yes and no as options for answers
// YNO- questions with yes and no as options and if yes select from sub-options
// YNE- questions with yes and no as options and if yes provide explanation
// NUM-question with numberical answers
// YNS- questions with yes and no as options and if yes then ask sub questions
// E  - questions with only explanation


export const medicalQuestions = {
  
  tattoo: [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  "permanent-makeup": [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],

  smp: [
    {
      id: 1,
      type: "YN",
      q: "Have you ever been tattooed before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  
  piercing: [
    {
      id: 1,
      type: "YNE",
      q: "Have ever been pierced before?",
    },
    {
      id: 2,
      type: "YNO",
      q: "Are you Pregnant( ) or Nursing( )?",
      subOpt: ["pregnant", "nursing"],
    },
    {
      id: 3,
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 6,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
  ],
  
  
  
  "tooth-gems": [
    {
      id: 1,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 2,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps and medications)",
    },
    {
      id: 3,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)?",
    },
    {
      id: 4,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 5,
      type: "YNE",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
    {
      id: 6,
      type: "YNE",
      q: "Do you have sensitive teeth?",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any synthetic (false, veneers, crowned, or capped) teeth?",
    },
  ],
  
  removal: [
    {
      id: 1,
      type: "NUM",
      q: "How old is your Tattoo?",
    },
    {
      id: 2,
      type: "YNS",
      q: "Did you have any adverse reactions after the application of the unwanted tattoo, (including, but not limited to: infections, swelling, and/or bleeding)?",
      sq: [
        {
          id: 21,
          type: "E",
          q: "did you pursue any additional medical treatment?",
        },
      ]
    },
    {
      id: 3,
      type: "YNS",
      q: "Have you had any previous tattoo removal sessions?",
      sq: [
        {
          id:31,
          type: "E",
          q:"What type of tattoo removal treatment have you received? Example: (Laser, Tattoo Vanish, etc.)"
        },
        {
          id:32,
          type: "NUM",
          q:"How many sessions have you done in total?"
        },
        {
          id:33,
          type: "E",
          q:"When was your last session?"
        },
      ]
    },
    {
      id: 4,
      type: "YNO",
      q: "Are you Pregnant or Nursing?",
      subOpt:["pregnant", "nursing"]
    },
    {
      id: 5,  
      type: "YNE",
      q: "Are you a hemophiliac (bleeder) or on any medications that may cause bleeding or may hinder blood clotting?",
    },
    {
      id: 6,
      type: "YNE",
      q: "Do you have any medical or skin conditions? Example: (keloids or hypertrophic scarring, psoriasis)",
    },
    {
      id: 7,
      type: "YNE",
      q: "Do you have any communicable diseases? Example: (H.I.V., A.I.D.S., HEPATITIS)",
    },
    {
      id: 8,
      type: "YNE",
      q: "Are you under the influence of alcohol or drugs, prescribed or otherwise?",
    },
    {
      id: 9,
      type: "YNE",
      q: "Do you have any allergies? Example: (to metals, latex gloves, soaps, and medications)",
    },
    {
      id: 10,
      type: "YN",
      q: "Do you have a heart condition, epilepsy, or diabetes?",
    },
    {
      id: 11,
      type: "YN",
      q: "Have you used Accutane within the past 6 months?",
    },
    {
      id: 12,
      type: "YN",
      q: "Do you have any medical implants?",
    },
    {
      id: 13,
      type: "YN",
      q: "Do you have Asthma?",
    },
    {
      id: 14,
      type: "YN",
      q: "Do you have an Autoimmune disorder?",
    },
    {
      id: 15,
      type: "YN",
      q: "Do you ever Faint or become dizzy?",
    },
    {
      id: 16,
      type: "YN",
      q: "Do you ever have problems healing minor wounds?",
    },
    {
      id: 17,
      type: "YN",
      q: "Have you taken any Herbal supplements today?",
    },
    {
      id: 18,
      type: "YN",
      q: "Do you have Hyper-pigment (darkened scars) or Hypo-pigment (lightened scars)?",
    },
    {
      id: 19,
      type: "YN",
      q: "Do you have a Pace Maker?",
    },
    {
      id: 20,
      type: "YN",
      q: "Have you ever received Radiation or chemotherapy treatment?",
    },
    
    {
      id: 21,
      type: "YN",
      q: "Do you have a Seizure-related condition?",
    },
    {
      id: 22,
      type: "YN",
      q: "Do you, or have you ever had Skin Cancer?",
    },
    {
      id: 23,
      type: "YN",
      q: "Are you a Smoker?",
    },
    {
      id: 24,
      type: "YN",
      q: "Do you use a tanning bed or any other artificial tanning products?",
    },
    {
      id: 25,
      type: "YN",
      q: "Do you Sunburn easily?",
    },
    {
      id: 26,
      type: "YN",
      q: "Do you have Vitiligo?",
    },   
  ],
};
