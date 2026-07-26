import status from "http-status";
import { VolunteerCompletionStatus } from "../../../generated/prisma/enums";
import { projectVolunteerService } from "../../services/project/projectVolunteer.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const assignProjectVolunteer = catchAsync(async (req, res) => {
  const result = await projectVolunteerService.assignProjectVolunteer(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer assigned to project successfully",
    data: result,
  });
});

const getVolunteersByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const query = {
    completionStatus: req.query.completionStatus as VolunteerCompletionStatus | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectVolunteerService.getVolunteersByProjectId(projectId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project volunteers fetched successfully",
    data: result,
  });
});

const getProjectVolunteersByVolunteerId = catchAsync(async (req, res) => {
  const volunteerId = (req.params.volunteerId as string) || req.user?.userId;
  const result = await projectVolunteerService.getProjectVolunteersByVolunteerId(volunteerId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer projects fetched successfully",
    data: result,
  });
});

const getProjectVolunteerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectVolunteerService.getProjectVolunteerById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer project assignment fetched successfully",
    data: result,
  });
});

const updateProjectVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectVolunteerService.updateProjectVolunteer(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer project assignment updated successfully",
    data: result,
  });
});

const removeProjectVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectVolunteerService.removeProjectVolunteer(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer removed from project successfully",
    data: result,
  });
});

export const projectVolunteerController = {
  assignProjectVolunteer,
  getVolunteersByProjectId,
  getProjectVolunteersByVolunteerId,
  getProjectVolunteerById,
  updateProjectVolunteer,
  removeProjectVolunteer,
};
