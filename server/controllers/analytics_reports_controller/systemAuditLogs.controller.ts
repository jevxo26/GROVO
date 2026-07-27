import { Request, Response } from "express";
import { SystemAuditLogsService } from "../../services/analytics_reports_service/systemAuditLogs.service";

const createAuditLog = async (req: Request, res: Response) => {
  try {
    const result = await SystemAuditLogsService.createAuditLog(req.body);
    res
      .status(201)
      .json({ success: true, message: "Audit log recorded", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSystemLog = async (req: Request, res: Response) => {
  try {
    const result = await SystemAuditLogsService.createSystemLog(req.body);
    res
      .status(201)
      .json({ success: true, message: "System log recorded", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createErrorLog = async (req: Request, res: Response) => {
  try {
    const result = await SystemAuditLogsService.createErrorLog(req.body);
    res
      .status(201)
      .json({ success: true, message: "Error log recorded", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createVisitorAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await SystemAuditLogsService.createVisitorAnalytics(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Visitor analytics recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const recordPerformanceMetric = async (req: Request, res: Response) => {
  try {
    const result = await SystemAuditLogsService.recordPerformanceMetric(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Performance metric recorded",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const SystemAuditLogsController = {
  createAuditLog,
  createSystemLog,
  createErrorLog,
  createVisitorAnalytics,
  recordPerformanceMetric,
};
