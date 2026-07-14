// src/type/index.ts

// ১. Volunteer Type
export interface Volunteer {
  id: string;
  name: string;
  district: string;
  code: string;
  location: string;
  members: number;
  score: number;
  rank: "Gold" | "Silver" | "Bronze" | "New";
  status: "active" | "pending";
}


export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  code: string;
  category: string;
  location: string;
  status: "active" | "assisted" | "pending";
  registered: string;
}

// ২. Donation Type
export interface Donation {
  id: string;
  receipt: string;
  donor: string;
  campaign: string;
  amount: number;
  type: string;
  date: string;
  status: "completed" | "pending";
}

// ৩. Branch Type
export interface Branch {
  id: string;
  name: string;
  address: string;
  code: string;
  type: string;
  location: string;
  status: "active" | "pending";
  established: string;
}

export interface Campaign {
  id: string;
  name: string;
  code: string;
  category: string;
  target: number;
  raised: number;
  progress: number;
  donors: number;
  status: "active" | "completed";
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  membership: string;
  type: string;
  district: string;
  status: "active" | "pending" | "suspended";
  joined: string;
}
