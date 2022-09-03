import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, id: number, name: string, date: string, title: string, origin: string, destination: string, distance: number, mode: string, emission: number) => {
  const trip = { id, name, date, title, origin, destination, distance, mode, emission };
  db.insert("trip", trip);
});
