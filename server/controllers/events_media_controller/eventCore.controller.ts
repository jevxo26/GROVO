import { Request, Response } from "express";
import { EventCoreService } from "../../services/events_media_service/eventCore.service";

const createEventCategory = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.createEventCategory(req.body);
    res
      .status(201)
      .json({ success: true, message: "Event category created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEvent = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.createEvent(req.body);
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.getAllEvents(req.query);
    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const registerUserForEvent = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.registerUserForEvent(req.body);
    res.status(201).json({
      success: true,
      message: "Registered for event successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const recordEventAttendance = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.recordEventAttendance(req.body);
    res.status(200).json({
      success: true,
      message: "Attendance recorded successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addEventSpeaker = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.addEventSpeaker(req.body);
    res.status(201).json({
      success: true,
      message: "Speaker added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const assignEventVolunteer = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.assignEventVolunteer(req.body);
    res.status(201).json({
      success: true,
      message: "Volunteer assigned successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEventSchedule = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.createEventSchedule(req.body);
    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEventSession = async (req: Request, res: Response) => {
  try {
    const result = await EventCoreService.createEventSession(req.body);
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const EventCoreController = {
  createEventCategory,
  createEvent,
  getAllEvents,
  registerUserForEvent,
  recordEventAttendance,
  addEventSpeaker,
  assignEventVolunteer,
  createEventSchedule,
  createEventSession,
};
