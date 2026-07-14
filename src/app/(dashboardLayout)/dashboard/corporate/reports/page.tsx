import { reports } from "@/data/report";
import { ReportCard } from "../components/ReportCard/ReportCard";


const ReportsPage = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;