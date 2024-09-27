export const tattooButtons = {
  head: {
    label: "head",
    nextLevel: {
      face: {
        label: "face",
        nextLevel: {
          forehead: {
            label: "forehead",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
              center: { label: "center" },
            },
          },
          temple: {
            label: "temple",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
            },
          },
          eyebrow: {
            label: "eyebrow",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
            },
          },
          eyelid: {
            label: "eyelid",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
            },
          },
          nose: {
            label: "nose",
          },
          cheeks: {
            label: "cheeks",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
            },
          },
          lip: {
            label: "lip",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
            },
          },
          jaw: {
            label: "jaw",
            nextLevel: {
              left: { label: "left" },
              right: { label: "right" },
              chin: { label: "chin" },
            },
          },
        },
      },
      scalp: {
        label: "scalp",
        nextLevel: {
          top: { label: "top" },
          back: { label: "back" },
          left: { label: "left" },
          right: { label: "right" },
          full: { label: "full" },
        },
      },
      ear: {
        label: "ear",
        nextLevel: {
          "left-ear": {
            label: "left-ear",
            nextLevel: {
              behind: { label: "behind" },
              inner: { label: "inner" },
              lobe: { label: "lobe" },
            },
          },
          "right-ear": {
            label: "right-ear",
            nextLevel: {
              behind: { label: "behind" },
              inner: { label: "inner" },
              lobe: { label: "lobe" },
            },
          },
        },
      },
    },
  },
  neck: {
    label: "neck",
    nextLevel: {
      front: { label: "front" },
      back: { label: "back" },
      left: { label: "left" },
      right: { label: "right" },
      full: { label: "full" },
    },
  },
  chest: {
    label: "chest",
    nextLevel: {
      "full-chest": { label: "full-chest" },
      "left-side": { label: "left-side" },
      "right-side": { label: "right-side" },
      center: { label: "center" },
      collarbone: {
        label: "collarbone",
        nextLevel: { left: { label: "left" }, right: { label: "right" } },
      },
      nipple: {
        label: "nipple",
        nextLevel: {
          left: { label: "left" },
          right: { label: "right" },
          both: { label: "both" },
        },
      },
      "under-chest": {
        label: "under-chest",
        nextLevel: {
          left: { label: "left" },
          right: { label: "right" },
          full: { label: "full" },
        },
      },
    },
  },
  torso: {
    label: "torso",
    nextLevel: {
      "full-torso": { label: "full-torso" },
      "left-ribs": { label: "left-ribs" },
      "right-ribs": { label: "right-ribs" },
      stomach: { label: "stomach" },
      "belly-button": { label: "belly-button" },
      "tummy-tuck": { label: "tummy-tuck" },
    },
  },
  back: {
    label: "back",
    nextLevel: {
      "full-back-piece": { label: "full-back-piece" },
      "right-shoulder": { label: "right-shoulder" },
      "left-shoulder": { label: "left-shoulder" },
      "spine": { label: "spine" },
      "lower-back": { label: "lower-back" },
      "other": { label: "other" },
    },
  },
  arm: {
    label: "arm",
    nextLevel: {
      "left-arm": {
        label: "left-arm",
        nextLevel: {
          "full-sleeve": {
            label: "full-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "half-sleeve": {
            label: "half-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          shoulder: {
            label: "shoulder",
          },
          armpit: {
            label: "armpit",
          },
          "upper-arm": {
            label: "upper-arm",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              front: { label: "front" },
              back: { label: "back" },
            },
          },
          elbow: {
            label: "elbow",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" } },
          },
          forearm: {
            label: "forearm",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              side: { label: "side" },
            },
          },
          wrist: {
            label: "wrist",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              side: { label: "side" },
            },
          },
        },
      },

      "right-arm": {
        label: "right-arm",
        nextLevel: {
          "full-sleeve": {
            label: "full-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "half-sleeve": {
            label: "half-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          shoulder: {
            label: "shoulder",
          },
          armpit: {
            label: "armpit",
          },
          "upper-arm": {
            label: "upper-arm",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              front: { label: "front" },
              back: { label: "back" },
            },
          },
          elbow: {
            label: "elbow",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" } },
          },
          forearm: {
            label: "forearm",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              side: { label: "side" },
            },
          },
          wrist: {
            label: "wrist",
            nextLevel: {
              inner: { label: "inner" },
              outer: { label: "outer" },
              side: { label: "side" },
            },
          },
        },
      },
    },
  },
  hand: {
    label: "hand",
    nextLevel: {
      "left-hand": {
        label: "left-hand",
        nextlevel: {
          top: { label: "top" },
          palm: { label: "palm" },
          side: { label: "side" },
          fingers: { label: "fingers" },
        },
      },
      "right-hand": {
        label: "right-hand",
        nextlevel: {
          top: { label: "top" },
          palm: { label: "palm" },
          side: { label: "side" },
          fingers: { label: "fingers" },
        },
      },
    },
  },
  hip: {
    label: "hip",
    nextLevel: {
      left: { label: "left" },
      right: { label: "right" },
    },
  },
  glutes: {
    label: "glutes",
    nextLevel: {
      left: { label: "left" },
      right: { label: "right" },
    },
  },
  pelvic: {
    label: "pelvic",
    nextLevel: {
      top: { label: "top" },
      middle: { label: "middle" },
      bottom: { label: "bottom" },
      left: { label: "left" },
      right: { label: "right" },
      full: { label: "full" },
    },
  },
  leg: {
    label: "leg",
    nextLevel: {
      "right-leg": {
        label: "right-leg",
        nextLevel: {
          "full-sleeve": {
            label: "full-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "half-sleeve": {
            label: "half-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "thigh": {
            label: "thigh",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
          "knee": {
            label: "knee",
            nextLevel: {front: { label: "front" },back: { label: "back" }, },
          },
          "lower-leg": {
            label: "lower-leg",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
          "ankle": {
            label: "ankle",
            nextLevel: {full: { label: "full" }, inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
        },
      },
      "left-leg": {
        label: "left-leg",
        nextLevel: {
          "full-sleeve": {
            label: "full-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "half-sleeve": {
            label: "half-sleeve",
            nextLevel: { upper: { label: "upper" }, lower: { label: "lower" } },
          },
          "thigh": {
            label: "thigh",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
          "knee": {
            label: "knee",
            nextLevel: {front: { label: "front" },back: { label: "back" }, },
          },
          "lower-leg": {
            label: "lower-leg",
            nextLevel: { inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
          "ankle": {
            label: "ankle",
            nextLevel: {full: { label: "full" }, inner: { label: "inner" }, outer: { label: "outer" },front: { label: "front" },back: { label: "back" }, },
          },
        },
      },
    },
  },
  foot: {
    label: "foot",
    nextLevel: {
      "left": {
        label: "left",
        nextLevel: {
          "top":{label:"top"},
          "side":{label:"side"},
          "toes":{label:"toes"},
        }
      },
      "right": {
        label: "right",
        nextLevel: {
          "top":{label:"top"},
          "side":{label:"side"},
          "toes":{label:"toes"},
        }
      }
    }
  },
};
