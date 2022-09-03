import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, from: string, to: string, distance: number, mode: string, ) => {
  const trip = { from, to, distance, mode };
  db.insert("trip", trip);
});
