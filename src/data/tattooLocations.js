export const tattooBodyLocations = [
  // Root-level locations (Level 1)
  { id: "head", label: "head", parentId: null, level: 1 },
  { id: "neck", label: "neck", parentId: null, level: 1 },
  { id: "chest", label: "chest", parentId: null, level: 1 },
  { id: "torso", label: "torso", parentId: null, level: 1 },
  { id: "arms", label: "arms", parentId: null, level: 1 },
  { id: "hands", label: "hands", parentId: null, level: 1 },
  { id: "pelvic", label: "pelvic", parentId: null, level: 1 },
  { id: "hip", label: "hip", parentId: null, level: 1 },
  { id: "glutes", label: "glutes", parentId: null, level: 1 },
  { id: "leg", label: "leg", parentId: null, level: 1 },
  { id: "foot", label: "foot", parentId: null, level: 1 },

  // Head -> Face (Level 2)
  { id: "face", label: "face", parentId: "head", level: 2 },
  { id: "scalp", label: "scalp", parentId: "head", level: 2 },
  { id: "ear", label: "ear", parentId: "head", level: 2 },

  // Face -> Forehead (Level 3)
  { id: "forehead", label: "forehead", parentId: "face", level: 3 },
  { id: "temple", label: "temple", parentId: "face", level: 3 },
  { id: "eyebrow", label: "eyebrow", parentId: "face", level: 3 },
  { id: "eyelid", label: "eyelid", parentId: "face", level: 3 },
  { id: "nose", label: "nose", parentId: "face", level: 3 },
  { id: "cheeks", label: "cheeks", parentId: "face", level: 3 },
  { id: "lip", label: "lip", parentId: "face", level: 3 },
  { id: "jaw", label: "jaw", parentId: "face", level: 3 },

  // Forehead -> Side options (Level 4)
  { id: "forehead-left", label: "left", parentId: "forehead", level: 4 },
  { id: "forehead-right", label: "right", parentId: "forehead", level: 4 },
  { id: "forehead-center", label: "center", parentId: "forehead", level: 4 },

  // Temple -> Side options (Level 4)
  { id: "temple-left", label: "left", parentId: "temple", level: 4 },
  { id: "temple-right", label: "right", parentId: "temple", level: 4 },

  // Jaw -> Side + Chin (Level 4)
  { id: "jaw-left", label: "left", parentId: "jaw", level: 4 },
  { id: "jaw-right", label: "right", parentId: "jaw", level: 4 },
  { id: "jaw-chin", label: "chin", parentId: "jaw", level: 4 },

  // Ear -> Left-ear, Right-ear (Level 3)
  { id: "left-ear", label: "left ear", parentId: "ear", level: 3 },
  { id: "right-ear", label: "right ear", parentId: "ear", level: 3 },

  // Left-ear -> Inner parts (Level 4)
  { id: "left-ear-inner", label: "inner", parentId: "left-ear", level: 4 },
  { id: "left-ear-behind", label: "behind", parentId: "left-ear", level: 4 },
  { id: "left-ear-lobe", label: "lobe", parentId: "left-ear", level: 4 },

  // Right-ear -> Inner parts (Level 4)
  { id: "right-ear-inner", label: "inner", parentId: "right-ear", level: 4 },
  { id: "right-ear-behind", label: "behind", parentId: "right-ear", level: 4 },
  { id: "right-ear-lobe", label: "lobe", parentId: "right-ear", level: 4 },

  // Scalp -> regions (Level 3)
  { id: "scalp-top", label: "top", parentId: "scalp", level: 3 },
  { id: "scalp-back", label: "back", parentId: "scalp", level: 3 },
  { id: "scalp-left", label: "left", parentId: "scalp", level: 3 },
  { id: "scalp-right", label: "right", parentId: "scalp", level: 3 },
  { id: "scalp-full", label: "full", parentId: "scalp", level: 3 },

  // neck -> regions (level 2)
  { id: "neck-front", label: "front", parentId: "neck", level: 2 },
  { id: "neck-back", label: "back", parentId: "neck", level: 2 },
  { id: "neck-left", label: "left", parentId: "neck", level: 2 },
  { id: "neck-right", label: "right", parentId: "neck", level: 2 },
  { id: "neck-full", label: "full", parentId: "neck", level: 2 },

  // chest -> regions (level 2)
  { id: "full-chest", label: "full chest", parentId: "chest", level: 2 },
  { id: "left-side", label: "left side", parentId: "chest", level: 2 },
  { id: "right-side", label: "right side", parentId: "chest", level: 2 },
  { id: "center", label: "center", parentId: "chest", level: 2 },
  { id: "collarbone", label: "collarbone", parentId: "chest", level: 2 },
  { id: "nipple", label: "nipple", parentId: "chest", level: 2 },
  { id: "under-chest", label: "under chest", parentId: "chest", level: 2 },

  // chest ->collarbone -> regions (level 3)

  { id: "collarbone-left", label: "left", parentId: "collarbone", level: 3 },
  { id: "collarbone-right", label: "right", parentId: "collarbone", level: 3 },

  // chest -> nipple -> regions (level 3)

  { id: "nipple-left", label: "left", parentId: "nipple", level: 3 },
  { id: "nipple-right", label: "right", parentId: "nipple", level: 3 },
  { id: "nipple-both", label: "both", parentId: "nipple", level: 3 },

  // chest -> under chest -> regions (level 3)
  { id: "under-chest-left", label: "left", parentId: "under-chest", level: 3 },
  {
    id: "under-chest-right",
    label: "right",
    parentId: "under-chest",
    level: 3,
  },
  { id: "under-chest-both", label: "both", parentId: "under-chest", level: 3 },

  // Torso -> level2

  { id: "full-torso", label: "full torso", parentId: "torso", level: 2 },
  { id: "left-ribs", label: "left ribs", parentId: "torso", level: 2 },
  { id: "right-ribs", label: "right ribs", parentId: "torso", level: 2 },
  { id: "stomach", label: "stomach", parentId: "torso", level: 2 },
  { id: "belly-button", label: "belly button", parentId: "torso", level: 2 },
  { id: "tummy-tuck", label: "tummy tuck", parentId: "torso", level: 2 },

  // Back -> level2

  {
    id: "full-back-piece",
    label: "full back piece",
    parentId: "back",
    level: 2,
  },
  { id: "right-shoulder", label: "right shoulder", parentId: "back", level: 2 },
  { id: "left-shoulder", label: "left shoulder", parentId: "back", level: 2 },
  { id: "spine", label: "spine", parentId: "back", level: 2 },
  { id: "lower-back", label: "lower back", parentId: "back", level: 2 },
  // { id: "other", label: "Other", parentId: "back", level: 2 },

  // arm level 2
  { id: "left-arm", label: "left arm", parentId: "arms", level: 2 },
  { id: "right-arm", label: "right arm", parentId: "arms", level: 2 },

  // arm -> left-arm -> level3
  {
    id: "full-sleeve-arm",
    label: "full sleeve",
    parentId: "left-arm",
    level: 3,
  },
  {
    id: "half-sleeve-arm",
    label: "half sleeve",
    parentId: "left-arm",
    level: 3,
  },
  { id: "shoulder", label: "shoulder", parentId: "left-arm", level: 3 },
  { id: "armpit", label: "armpit", parentId: "left-arm", level: 3 },
  { id: "upper-arm", label: "upper arm", parentId: "left-arm", level: 3 },
  { id: "elbow", label: "elbow", parentId: "left-arm", level: 3 },
  { id: "forearm", label: "forearm", parentId: "left-arm", level: 3 },
  { id: "wrist", label: "wrist", parentId: "left-arm", level: 3 },

  // arm -> right-arm -> level3

  {
    id: "full-sleeve-arm",
    label: "full sleeve",
    parentId: "right-arm",
    level: 3,
  },
  {
    id: "half-sleeve-arm",
    label: "half sleeve",
    parentId: "right-arm",
    level: 3,
  },
  { id: "shoulder", label: "shoulder", parentId: "right-arm", level: 3 },
  { id: "armpit", label: "armpit", parentId: "right-arm", level: 3 },
  { id: "upper-arm", label: "upper arm", parentId: "right-arm", level: 3 },
  { id: "elbow", label: "elbow", parentId: "right-arm", level: 3 },
  { id: "forearm", label: "forearm", parentId: "right-arm", level: 3 },
  { id: "wrist", label: "wrist", parentId: "right-arm", level: 3 },

  // arm -> right-arm -> full-sleeve -> level4
  {
    id: "full-sleeve-upper",
    label: "upper",
    parentId: "full-sleeve-arm",
    level: 4,
  },
  {
    id: "full-sleeve-lower",
    label: "lower",
    parentId: "full-sleeve-arm",
    level: 4,
  },

  // arm -> right-arm -> half-sleeve -> level4
  {
    id: "half-sleeve-upper",
    label: "upper",
    parentId: "half-sleeve-arm",
    level: 4,
  },
  {
    id: "half-sleeve-lower",
    label: "lower",
    parentId: "half-sleeve-arm",
    level: 4,
  },

  // arm -> right-arm -> upper-arm -> level4
  { id: "upper-arm-inner", label: "inner", parentId: "upper-arm", level: 4 },
  { id: "upper-arm-outer", label: "outer", parentId: "upper-arm", level: 4 },
  { id: "upper-arm-front", label: "front", parentId: "upper-arm", level: 4 },
  { id: "upper-arm-back", label: "back", parentId: "upper-arm", level: 4 },

  // arm -> right-arm -> elbow -> level4
  { id: "elbow-upper", label: "upper", parentId: "elbow", level: 4 },
  { id: "elbow-lower", label: "lower", parentId: "elbow", level: 4 },

  // arm -> right-arm -> forearm -> level4
  { id: "forearm-inner", label: "inner", parentId: "forearm", level: 4 },
  { id: "forearm-outer", label: "outer", parentId: "forearm", level: 4 },
  { id: "forearm-side", label: "side", parentId: "forearm", level: 4 },

  // arm -> right-arm -> wrist -> level4
  { id: "wrist-inner", label: "inner", parentId: "wrist", level: 4 },
  { id: "wrist-outer", label: "outer", parentId: "wrist", level: 4 },
  { id: "wrist-side", label: "side", parentId: "wrist", level: 4 },

  // hand -> level2
  { id: "left-hand", label: "left hand", parentId: "hands", level: 2 },
  { id: "right-hand", label: "right hand", parentId: "hands", level: 2 },

  // hand -> left-hand-> level3
  { id: "top", label: "top", parentId: "left-hand", level: 3 },
  { id: "palm", label: "palm", parentId: "left-hand", level: 3 },
  { id: "side", label: "side", parentId: "left-hand", level: 3 },
  { id: "fingers", label: "fingers", parentId: "left-hand", level: 3 },

  // hand -> right-hand-> level3
  { id: "top", label: "top", parentId: "right-hand", level: 3 },
  { id: "palm", label: "palm", parentId: "right-hand", level: 3 },
  { id: "side", label: "side", parentId: "right-hand", level: 3 },
  { id: "fingers", label: "fingers", parentId: "right-hand", level: 3 },

  // Hip -> level2
  { id: "left", label: "left", parentId: "hip", level: 2 },
  { id: "right", label: "right", parentId: "hip", level: 2 },

  // glutes -> level2
  { id: "left", label: "left", parentId: "glutes", level: 2 },
  { id: "right", label: "right", parentId: "glutes", level: 2 },

  // pelvic -> level2
  { id: "top", label: "top", parentId: "pelvic", level: 2 },
  { id: "middle", label: "middle", parentId: "pelvic", level: 2 },
  { id: "bottom", label: "bottom", parentId: "pelvic", level: 2 },
  { id: "left", label: "left", parentId: "pelvic", level: 2 },
  { id: "right", label: "right", parentId: "pelvic", level: 2 },
  { id: "full", label: "full", parentId: "pelvic", level: 2 },

  // leg-> level2
  { id: "left-leg", label: "left leg", parentId: "leg", level: 2 },
  { id: "right-leg", label: "right leg", parentId: "leg", level: 2 },

  // leg->left-leg -> level3
  {
    id: "full-sleeve-leg",
    label: "full sleeve",
    parentId: "left-leg",
    level: 3,
  },
  {
    id: "half-sleeve-leg",
    label: "half sleeve",
    parentId: "left-leg",
    level: 3,
  },
  { id: "thigh", label: "thigh", parentId: "left-leg", level: 3 },
  { id: "knee", label: "knee", parentId: "left-leg", level: 3 },
  { id: "lower-leg", label: "lower leg", parentId: "left-leg", level: 3 },
  { id: "ankle", label: "ankle", parentId: "left-leg", level: 3 },

  // leg->right-leg -> level3
  {
    id: "full-sleeve-leg",
    label: "full sleeve",
    parentId: "right-leg",
    level: 3,
  },
  {
    id: "half-sleeve-leg",
    label: "half sleeve",
    parentId: "right-leg",
    level: 3,
  },
  { id: "thigh", label: "thigh", parentId: "right-leg", level: 3 },
  { id: "knee", label: "knee", parentId: "right-leg", level: 3 },
  { id: "lower-leg", label: "lower leg", parentId: "right-leg", level: 3 },
  { id: "ankle", label: "ankle", parentId: "right-leg", level: 3 },

  // leg-right-leg -> full-sleeve ->level4
  { id: "upper", label: "upper", parentId: "full-sleeve-leg", level: 4 },
  { id: "lower", label: "lower", parentId: "full-sleeve-leg", level: 4 },

  // leg-right-leg -> half-sleeve ->level4
  { id: "upper", label: "upper", parentId: "half-sleeve-leg", level: 4 },
  { id: "lower", label: "lower", parentId: "half-sleeve-leg", level: 4 },

  // leg-right-leg -> thigh ->level4
  { id: "inner", label: "inner", parentId: "thigh", level: 4 },
  { id: "outer", label: "outer", parentId: "thigh", level: 4 },
  { id: "front", label: "front", parentId: "thigh", level: 4 },
  { id: "back", label: "back", parentId: "thigh", level: 4 },

  // leg-right-leg -> Knee ->level4
  { id: "front", label: "front", parentId: "knee", level: 4 },
  { id: "back", label: "back", parentId: "knee", level: 4 },

  // leg-right-leg -> lower-leg ->level4
  { id: "inner", label: "inner", parentId: "lower-leg", level: 4 },
  { id: "outer", label: "outer", parentId: "lower-leg", level: 4 },
  { id: "front", label: "front", parentId: "lower-leg", level: 4 },
  { id: "back", label: "back", parentId: "lower-leg", level: 4 },

  // leg-right-leg -> ankle ->level4
  { id: "full", label: "full", parentId: "ankle", level: 4 },
  { id: "inner", label: "inner", parentId: "ankle", level: 4 },
  { id: "outer", label: "outer", parentId: "ankle", level: 4 },
  { id: "front", label: "front", parentId: "ankle", level: 4 },
  { id: "back", label: "back", parentId: "ankle", level: 4 },

  // foot ->level2

  { id: "left-foot", label: "left foot", parentId: "foot", level: 2 },
  { id: "right-foot", label: "right foot", parentId: "foot", level: 2 },

  // foot ->left-foot ->level3
  { id: "top", label: "top", parentId: "left-foot", level: 3 },
  { id: "side", label: "side", parentId: "left-foot", level: 3 },
  { id: "toes", label: "toes", parentId: "left-foot", level: 3 },

  // foot ->right-foot ->level3
  { id: "top", label: "top", parentId: "right-foot", level: 3 },
  { id: "side", label: "side", parentId: "right-foot", level: 3 },
  { id: "toes", label: "toes", parentId: "right-foot", level: 3 },
];

export const piercingBodyLocations = [
   {id:"Belly Piercing 14g", label:"belly piercing" , parentId:null, level:1}, 
   {id:"nipple-piercing 14g", label:"Nipple Piercing" , parentId:null, level:1}, 
   {id:"ear-piercing", label:"Ear Piercing" , parentId:null, level:1}, 
   {id:"facial-piercing", label:"Facial Piercing" , parentId:null, level:1}, 
   {id:"jewelry-swap", label:"Jewelry Swap" , parentId:null, level:1}, 
   {id:"nose-piercing", label:"Nose Piercing" , parentId:null, level:1}, 
   {id:"oral-piercing", label:"Oral Piercing" , parentId:null, level:1}, 
   {id:"surface-piercing", label:"Surface Piercing" , parentId:null, level:1}, 
   {id:"vaginal-piercing", label:"Vaginal Piercing" , parentId:null, level:1}, 



   {id:"Regular Earlobe 20g", label:"Regular Earlobe" , parentId:"ear-piercing", level:2}, 
   {id:"Upper Earlobe 20g", label:"Upper Earlobe" , parentId:"ear-piercing", level:2}, 
   {id:"Industrial 16g", label:"Industrial" , parentId:"ear-piercing", level:2}, 
   {id:"Tragus 16g", label:"Tragus" , parentId:"ear-piercing", level:2}, 
   {id:"Rook 16g", label:"Rook" , parentId:"ear-piercing", level:2}, 
   {id:"Conch 16g", label:"Conch" , parentId:"ear-piercing", level:2}, 
   {id:"Daith 16g", label:"Daith" , parentId:"ear-piercing", level:2}, 
   {id:"Snug 16g", label:"Snug" , parentId:"ear-piercing", level:2}, 
   {id:"Forward Helix 16g", label:"Forward Helix" , parentId:"ear-piercing", level:2}, 
   {id:"Helix 16g", label:"Helix" , parentId:"ear-piercing", level:2}, 
   {id:"Anti Helix 16g", label:"Anti Helix" , parentId:"ear-piercing", level:2}, 
   {id:"Anti Tragus 16g", label:"Anti Tragus" , parentId:"ear-piercing", level:2}, 
   {id:"Auricle 16g", label:"Auricle" , parentId:"ear-piercing", level:2}, 
   {id:"External Auditory Meatus 16g", label:"External Auditory Meatus" , parentId:"ear-piercing", level:2}, 
   {id:"Transverse Lobe 16g", label:"Transverse Lobe" , parentId:"ear-piercing", level:2}, 


   {id:"Cheek 14g", label:"Cheek" , parentId:"facial-piercing", level:2}, 
   {id:"Eyebrow 16g", label:"Eyebrow" , parentId:"facial-piercing", level:2}, 
   {id:"sideburn 16g", label:"sideburn" , parentId:"facial-piercing", level:2}, 



   {id:"Nose area", label:"Nose area" , parentId:"jewelry-swap", level:2}, 
   {id:"Ear area", label:"Ear area" , parentId:"jewelry-swap", level:2}, 
   {id:"Belly", label:"Belly" , parentId:"jewelry-swap", level:2}, 
   {id:"Oral area", label:"Oral area" , parentId:"jewelry-swap", level:2}, 
   {id:"Facial area", label:"Facial area" , parentId:"jewelry-swap", level:2}, 
   {id:"Nipple", label:"Nipple" , parentId:"jewelry-swap", level:2}, 
   {id:"Surface", label:"Surface" , parentId:"jewelry-swap", level:2}, 
   {id:"Vaginal Area", label:"Vaginal Area" , parentId:"jewelry-swap", level:2},


   {id:"Nostril 19g", label:"Nostril" , parentId:"nose-piercing", level:2}, 
   {id:"Septum 16g", label:"Septum" , parentId:"nose-piercing", level:2}, 
   {id:"Austin Bar 16g", label:"Austin Bar" , parentId:"nose-piercing", level:2}, 
   {id:"Erl 16g", label:"Erl" , parentId:"nose-piercing", level:2}, 
   {id:"High Nostril 19g", label:"High Nostril" , parentId:"nose-piercing", level:2}, 
   {id:"Nostril Nasallang 16g", label:"Nostril Nasallang" , parentId:"nose-piercing", level:2}, 
   {id:"Rhino 16g", label:"Rhino" , parentId:"nose-piercing", level:2}, 
   {id:"Septril 16g", label:"Septril" , parentId:"nose-piercing", level:2}, 
   {id:"Third Eye", label:"Third Eye" , parentId:"nose-piercing", level:2}, 



   { id: "Straight Bar Tongue 14g", label: "Straight Bar Tongue", parentId: "oral-piercing", level: 2 },
  { id: "Snake Eye Tongue 16g", label: "Snake Eye Tongue", parentId: "oral-piercing", level: 2 },
  { id: "Snake Bite Lip 16g", label: "Snake Bite Lip", parentId: "oral-piercing", level: 2 },
  { id: "Tongue Web 16g", label: "Tongue Web", parentId: "oral-piercing", level: 2 },
  { id: "Smiley 16g", label: "Smiley", parentId: "oral-piercing", level: 2 },
  { id: "Monroe 16g", label: "Monroe", parentId: "oral-piercing", level: 2 },
  { id: "Medusa 16g", label: "Medusa", parentId: "oral-piercing", level: 2 },
  { id: "Madonna 16g", label: "Madonna", parentId: "oral-piercing", level: 2 },
  { id: "Dimples 14g", label: "Dimples", parentId: "oral-piercing", level: 2 },
  { id: "Ashley 16g", label: "Ashley", parentId: "oral-piercing", level: 2 },
  { id: "Angel Bites 16g", label: "Angel Bites", parentId: "oral-piercing", level: 2 },
  { id: "Canine Bites 16g", label: "Canine Bites", parentId: "oral-piercing", level: 2 },
  { id: "Cyber Bites 16g", label: "Cyber Bites", parentId: "oral-piercing", level: 2 },
  { id: "Dahlia 16g", label: "Dahlia", parentId: "oral-piercing", level: 2 },
  { id: "Dolphin Bites 16g", label: "Dolphin Bites", parentId: "oral-piercing", level: 2 },
  { id: "Frowney 16g", label: "Frowney", parentId: "oral-piercing", level: 2 },
  { id: "Gum 16g", label: "Gum", parentId: "oral-piercing", level: 2 },
  { id: "Horizontal Lip 16g", label: "Horizontal Lip", parentId: "oral-piercing", level: 2 },
  { id: "Jestrum 16g", label: "Jestrum", parentId: "oral-piercing", level: 2 },
  { id: "Multi Tongue 16g", label: "Multi Tongue", parentId: "oral-piercing", level: 2 },
  { id: "Shark Bites 16g", label: "Shark Bites", parentId: "oral-piercing", level: 2 },
  { id: "Spider Bites 16g", label: "Spider Bites", parentId: "oral-piercing", level: 2 },
  { id: "Vampire 16g", label: "Vampire", parentId: "oral-piercing", level: 2 },
  { id: "Venom 16g", label: "Venom", parentId: "oral-piercing", level: 2 },
  { id: "Vertical Labret 16g", label: "Vertical Labret", parentId: "oral-piercing", level: 2 },


    { id: "Arm 16g", label: "Arm", parentId: "surface-piercing", level: 2 },
  { id: "Back 16g", label: "Back", parentId: "surface-piercing", level: 2 },
  { id: "Chest 16g", label: "Chest", parentId: "surface-piercing", level: 2 },
  { id: "Face 16g", label: "Face", parentId: "surface-piercing", level: 2 },
  { id: "Finger 16g", label: "Finger", parentId: "surface-piercing", level: 2 },
  { id: "Foot 16g", label: "Foot", parentId: "surface-piercing", level: 2 },
  { id: "Hand 16g", label: "Hand", parentId: "surface-piercing", level: 2 },
  { id: "Hip 16g", label: "Hip", parentId: "surface-piercing", level: 2 },
  { id: "Leg 16g", label: "Leg", parentId: "surface-piercing", level: 2 },
  { id: "Neck 16g", label: "Neck", parentId: "surface-piercing", level: 2 },
  { id: "Pelvic 16g", label: "Pelvic", parentId: "surface-piercing", level: 2 },
  { id: "Ribs 16g", label: "Ribs", parentId: "surface-piercing", level: 2 },
  { id: "Shoulder 16g", label: "Shoulder", parentId: "surface-piercing", level: 2 },
  { id: "Stomach 16g", label: "Stomach", parentId: "surface-piercing", level: 2 },


   
  
   
   








];
