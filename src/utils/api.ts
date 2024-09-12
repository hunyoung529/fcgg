const BASE_URL = `https://open.api.nexon.com/fconline/v1`;
const API_KEY =
  "live_4f57153bb99a388e2ea5b693777f054ee2ecec7dcc449c82b1c5347c89c84e86d6de6ab228a209130a4963ede623c0bc";
const STATIC_URL = "https://open.api.nexon.com/static/fconline/meta";

export async function getOuid(nickname: string) {
  const response = await fetch(`${BASE_URL}/id?nickname=${nickname}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data.ouid;
}

export const getMatchList = async (matchType: string, ouid: string) => {
  if (!matchType) {
    return [];
  }

  const response = await fetch(
    `https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&offset=0&limit=100`,
    {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed to fetch match list:", errorData);
    return [];
  }

  const data = await response.json();
  return data;
};

export async function getAllMatchDetails(matchIds: string[]) {
  if (!Array.isArray(matchIds)) {
    console.error("matchIds is not an array:", matchIds);
    return [];
  }
  const promises = matchIds.map(async (matchId) => {
    const matchDetail = await getMatchDetail(matchId);
    return {
      ...matchDetail,
      fetchedAt: new Date().toISOString(), // 데이터를 가져온 시간을 포함
    };
  });
  const matchDetails = await Promise.all(promises);
  return matchDetails;
}

export async function getBasicInfo(ouid: string) {
  const response = await fetch(`${BASE_URL}/user/basic?ouid=${ouid}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
  const data = await response.json();
  return data;
}

export async function getMatchDetail(matchId: string) {
  const response = await fetch(`${BASE_URL}/match-detail?matchid=${matchId}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
  const data = await response.json();
  return data;
}

export async function getMaxDivision(ouid: string) {
  const response = await fetch(`${BASE_URL}/user/maxdivision?ouid=${ouid}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
  const data = await response.json();
  return data;
}

export async function getPlayerMeta() {
  const response = await fetch(`${STATIC_URL}/spid.json`);
  const data = await response.json();
  return data;
}

export async function getSeasonMeta() {
  const response = await fetch(`${STATIC_URL}/seasonid.json`);
  const data = await response.json();
  return data;
}
