/**
 * Shared Bangladesh division → district mapping data.
 * Single source of truth — used by branch, beneficiary, and volunteer modals.
 */
export const divisionsData: Record<string, string[]> = {
  Dhaka: [
    "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur",
    "Manikganj", "Munshiganj", "Narsingdi", "Gopalganj", "Madaripur",
    "Rajbari", "Shariatpur", "Kishoreganj",
  ],
  Chattogram: [
    "Chattogram", "Cox's Bazar", "Feni", "Comilla", "Brahmanbaria",
    "Rangamati", "Khagrachhari", "Bandarban", "Noakhali", "Lakshmipur",
    "Chandpur",
  ],
  Rajshahi: [
    "Rajshahi", "Bogura", "Pabna", "Joypurhat", "Naogaon",
    "Natore", "Chapainawabganj", "Sirajganj",
  ],
  Khulna: [
    "Khulna", "Jashore", "Bagerhat", "Satkhira", "Kushtia",
    "Chuadanga", "Meherpur", "Jhenaidah", "Magura", "Narail",
  ],
  Barishal: [
    "Barishal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati",
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: [
    "Rangpur", "Dinajpur", "Gaibandha", "Kurigram",
    "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

/** Select‐friendly options for divisions */
export const divisionOptions = Object.keys(divisionsData).map((div) => ({
  value: div,
  label: div,
}));

/** Get district options for a given division name */
export function getDistrictOptions(division: string | undefined) {
  if (!division || !divisionsData[division]) return [];
  return divisionsData[division].map((dist) => ({
    value: dist,
    label: dist,
  }));
}
