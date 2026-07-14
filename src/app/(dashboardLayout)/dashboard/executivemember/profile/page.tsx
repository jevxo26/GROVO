import { Profile } from "../components/Profile/Profile";

const Page = () => {
  const userData = {
    name: "Dr. Imran Hossain",
    membershipType: "Executive Member",
    memberNo: "ASH-MEM-2024-0847",
    image: "/image.jpg",
    badges: ["Early Supporter", "Monthly Donor"],
    personalInfo: [
        { label: "Email", value: "test@gmail.com" },
        { label: "Phone", value: "+880 1712-345678" }
    ],
    membershipInfo: [
        { label: "Joined", value: "2024-03-15" },
        { label: "Contribution", value: "৳ 1,000" }
    ],
    validUntil: "2027-03-15"
  };

  return <Profile user={userData} />;
};

export default Page;