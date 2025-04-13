export const fetchEvents = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/events');
  return res.json();
};

export const fetchEventById = async (id) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/events/' + id);
  return res.json();
};
