async function getGames(userId, cursor) {
  const allGames = [];         
  const list = await(await fetch(`https://games.roblox.com/v2/users/${userId}/games?sortOrder=Asc&limit=50${cursor != undefined ? `&cursor={cursor}` : ""}`)).json();
  list.data.forEach((e, i) => allGames.push(e));                         
  if (list.nextPageCursor) {
    const [next, nextCursor] = getGames(userId, list.nextPageCursor);          
    next.forEach((e, i) => allGames.push(e));             
  }
  return allGames, list.nextPageCursor;
}
export default async function(userId) {
  let total = 0;     
  const allGames = getGames(userId);         
  allGames.forEach((e, i) => {
    total += e.placeVisits || 0;
  });
  return total;
}
