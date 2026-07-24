import status from "http-status";
import { projectBeneficiaryService } from "../../services/project/projectBeneficiary.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createProjectBeneficiary = catchAsync(async (req, res) => {
  const result = await projectBeneficiaryService.createProjectBeneficiary(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Project beneficiary added successfully",
    data: result,
  });
});

const getBeneficiariesByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const query = {
    beneficiaryType: req.query.beneficiaryType as string | undefined,
    assistanceType: req.query.assistanceType as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await projectBeneficiaryService.getBeneficiariesByProjectId(projectId as string, query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project beneficiaries fetched successfully",
    data: result,
  });
});

const getProjectBeneficiaryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectBeneficiaryService.getProjectBeneficiaryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project beneficiary fetched successfully",
    data: result,
  });
});

const updateProjectBeneficiary = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectBeneficiaryService.updateProjectBeneficiary(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project beneficiary updated successfully",
    data: result,
  });
});

const deleteProjectBeneficiary = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectBeneficiaryService.deleteProjectBeneficiary(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Project beneficiary deleted successfully",
    data: result,
  });
});

export const projectBeneficiaryController = {
  createProjectBeneficiary,
  getBeneficiariesByProjectId,
  getProjectBeneficiaryById,
  updateProjectBeneficiary,
  deleteProjectBeneficiary,
};
