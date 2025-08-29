export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ is_success: false, error: "Invalid JSON" });
      }
    }

    const { data } = body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const user_id = "balaji_ganesh_tammireddy_05022005";
    const email = "balaji.22bce7296@vitapstudent.ac.in";
    const roll_number = "22BCE7296";

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (typeof item !== "string") item = String(item);
      item = item.trim();

      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else if (item.length > 0) {
        special_characters.push(item);
      }
    });

    const concat_string = alphabets
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
}
