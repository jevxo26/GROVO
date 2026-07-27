import { Request, Response } from "express";
import { DashboardCoreService } from "../../services/analytics_reports_service/dashboardCore.service";

const createDashboard = async (req: Request, res: Response) => {
  try {
    const result = await DashboardCoreService.createDashboard(req.body);
    res
      .status(201)
      .json({ success: true, message: "Dashboard created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDashboardWidget = async (req: Request, res: Response) => {
  try {
    const result = await DashboardCoreService.createDashboardWidget(req.body);
    res.status(201).json({
      success: true,
      message: "Dashboard widget created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDashboardLayout = async (req: Request, res: Response) => {
  try {
    const result = await DashboardCoreService.createDashboardLayout(req.body);
    res.status(201).json({
      success: true,
      message: "Dashboard layout configured",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createKPI = async (req: Request, res: Response) => {
  try {
    const result = await DashboardCoreService.createKPI(req.body);
    res
      .status(201)
      .json({ success: true, message: "KPI created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getKPIs = async (req: Request, res: Response) => {
  try {
    const result = await DashboardCoreService.getKPIs();
    res.status(200).json({
      success: true,
      message: "KPIs fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const DashboardCoreController = {
  createDashboard,
  createDashboardWidget,
  createDashboardLayout,
  createKPI,
  getKPIs,
};
