import { Request, Response } from "express";
import { ReportsExportService } from "../../services/analytics_reports_service/reportsExport.service";

const createReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportsExportService.createReport(req.body);
    res
      .status(201)
      .json({ success: true, message: "Report generated", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createReportTemplate = async (req: Request, res: Response) => {
  try {
    const result = await ReportsExportService.createReportTemplate(req.body);
    res.status(201).json({
      success: true,
      message: "Report template created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createScheduledReport = async (req: Request, res: Response) => {
  try {
    const result = await ReportsExportService.createScheduledReport(req.body);
    res.status(201).json({
      success: true,
      message: "Report schedule created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createReportExport = async (req: Request, res: Response) => {
  try {
    const result = await ReportsExportService.createReportExport(req.body);
    res.status(201).json({
      success: true,
      message: "Report export generated",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ReportsExportController = {
  createReport,
  createReportTemplate,
  createScheduledReport,
  createReportExport,
};
