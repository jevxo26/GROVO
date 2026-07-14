import httpStatus from "http-status";
import customError from "../error/customError";
import { localizationService } from "../services/localization.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const updateExchangeRate = catchAsync(async (req, res) => {
  const { currencyCode, exchangeRate } = req.body;

  if (!currencyCode || exchangeRate === undefined || exchangeRate <= 0) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid conversion parameters.",
    );
  }

  const result = await localizationService.updateExchangeRate({
    currencyCode,
    exchangeRate,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Exchange rate updated successfully",
    data: result,
  });
});

const setTranslationKey = catchAsync(async (req, res) => {
  const { languageId, key, value, moduleName } = req.body;

  if (!languageId || !key || !value) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required translation parameters.",
    );
  }

  const result = await localizationService.setTranslationKey({
    languageId,
    key,
    value,
    moduleName,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Translation key set successfully",
    data: result,
  });
});

export const localizationController = {
  updateExchangeRate,
  setTranslationKey,
};
