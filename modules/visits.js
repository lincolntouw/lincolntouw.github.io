var proxy = 'https://script.google.com/macros/s/AKfycbxwVCgNXp4MmhOGmiYuG2ZYz-Dj8ZNGiurj91iKLh82GGpyxSbR1Dm9baU5g9W2dK4vxA/exec?url=';       
async function getGames(userId, cursor) {
  const allGames = [];         
  const list = await(await fetch( proxy + encodeURIComponent(`https://games.roblox.com/v2/users/${userId}/games?sortOrder=Asc&limit=50${cursor != undefined ? `&cursor={cursor}` : ""}`), { redirect: 'follow', } )).json();
  console.log(list);
  list.data.forEach((e, i) => allGames.push(e));                         
  if (list.nextPageCursor) {
    const [next, nextCursor] = getGames(userId, list.nextPageCursor);          
    next.forEach((e, i) => allGames.push(e));             
  }
  return allGames, list.nextPageCursor;
}
export default async function(userId) {
  let total = 0;     
  const [allGames, na] = getGames(userId);                  
  console.log(allGames, na);
  allGames.forEach((e, i) => {     
    total += e.placeVisits || 0;
  });
  return total;
}
