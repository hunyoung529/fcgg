const BASE_URL = `https://open.api.nexon.com/fconline/v1`;
const Static_URL = "https://static.api.nexon.co.kr/fconline/latest";
const API_KEY =
  "test_4f57153bb99a388e2ea5b693777f054e010263de4910d93b6b5422da86f93d6864855ef28173c38e8cfeb0c4fa1ed4aa";

export function fetchOuid(userId: string) {
  return fetch(`${BASE_URL}/id?nickname=${userId}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  }).then((response) => response.json());
}

export function fetchBasic(ouid: string) {
  return fetch(`${BASE_URL}/user/basic?ouid=${ouid}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  }).then((response) => response.json());
}
export function fetchMaxDivision(ouid: string) {
  return fetch(`${BASE_URL}/user/maxdivision?ouid=${ouid}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  }).then((response) => response.json());
}
