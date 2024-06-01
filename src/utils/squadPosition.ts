export interface PositionCoordinates {
  order: number;
}

export interface TeamCoordinates {
  home: Record<number, PositionCoordinates>;
  away: Record<number, PositionCoordinates>;
}

const playerCoordinates: TeamCoordinates = {
  home: {
    0: { order: 0 + 3 * 14 }, // GW
    1: { order: 1 + 3 * 14 }, // SW
    2: { order: 2 + 6 * 14 }, // RWB
    3: { order: 1 + 6 * 14 }, // RB
    4: { order: 1 + 4 * 14 }, // RCB
    5: { order: 1 + 3 * 14 }, // CB
    6: { order: 1 + 2 * 14 }, // LCB
    7: { order: 1 + 0 * 14 }, // LB
    8: { order: 2 + 0 * 14 }, // LWB
    9: { order: 3 + 4 * 14 }, // RDM
    10: { order: 2 + 3 * 14 }, // CDM
    11: { order: 3 + 2 * 14 }, // LDM
    12: { order: 4 + 6 * 14 }, // RM
    13: { order: 3 + 4 * 14 }, // RCM
    14: { order: 3 + 4 * 14 }, // CM
    15: { order: 3 + 2 * 14 }, // LCM
    16: { order: 4 + 0 * 14 }, // LM
    17: { order: 5 + 3 * 14 }, // RAM
    18: { order: 4 + 3 * 14 }, // CAM
    19: { order: 3 + 3 * 14 }, // LAM
    20: { order: 5 + 4 * 14 }, // RF
    21: { order: 5 + 3 * 14 }, // CF
    22: { order: 5 + 2 * 14 }, // LF
    23: { order: 6 + 6 * 14 }, // RW
    24: { order: 6 + 4 * 14 }, // RS
    25: { order: 6 + 3 * 14 }, // ST
    26: { order: 6 + 2 * 14 }, // LS
    27: { order: 6 + 0 * 14 }, // LW
    28: { order: 1 + 9 * 14 }, // SUB (Dynamic Substitutes will be adjusted dynamically)
  },
  away: {
    0: { order: 13 + 3 * 14 }, // GK
    1: { order: 12 + 3 * 14 }, // SW
    2: { order: 11 + 0 * 14 }, // RWB
    3: { order: 12 + 0 * 14 }, // RB
    4: { order: 12 + 2 * 14 }, // RCB
    5: { order: 12 + 3 * 14 }, // CB
    6: { order: 12 + 4 * 14 }, // LCB
    7: { order: 12 + 6 * 14 }, // LB
    8: { order: 11 + 6 * 14 }, // LWB
    9: { order: 11 + 2 * 14 }, // RDM
    10: { order: 11 + 3 * 14 }, // CDM
    11: { order: 11 + 4 * 14 }, // LDM
    12: { order: 9 + 0 * 14 }, // RM
    13: { order: 10 + 2 * 14 }, // RCM
    14: { order: 10 + 3 * 14 }, // CM
    15: { order: 10 + 4 * 14 }, // LCM
    16: { order: 9 + 6 * 14 }, // LM
    17: { order: 9 + 4 * 14 }, // RAM
    18: { order: 9 + 3 * 14 }, // CAM
    19: { order: 9 + 2 * 14 }, // LAM
    20: { order: 8 + 3 * 14 }, // RF
    21: { order: 8 + 3 * 14 }, // CF
    22: { order: 8 + 5 * 14 }, // LF
    23: { order: 7 + 0 * 14 }, // RW
    24: { order: 7 + 2 * 14 }, // RS
    25: { order: 7 + 3 * 14 }, // ST
    26: { order: 7 + 4 * 14 }, // LS
    27: { order: 7 + 6 * 14 }, // LW
    28: { order: 10 + 9 * 14 }, // SUB (Dynamic Substitutes will be adjusted dynamically)
  },
};

export default playerCoordinates;
