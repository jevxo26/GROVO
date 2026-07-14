import { prisma } from "../lib/prisma";

const updateExchangeRate = async (payload: {
  currencyCode: string;
  exchangeRate: number;
}) => {
  return await prisma.currency.update({
    where: { currencyCode: payload.currencyCode },
    data: { exchangeRate: parseFloat(payload.exchangeRate.toString()) },
  });
};

const setTranslationKey = async (payload: {
  languageId: string;
  key: string;
  value: string;
  moduleName?: string;
}) => {
  return await prisma.translation.upsert({
    where: {
      languageId_key: {
        languageId: payload.languageId,
        key: payload.key,
      },
    },
    update: {
      value: payload.value,
      updatedAt: new Date(),
    },
    create: {
      languageId: payload.languageId,
      key: payload.key,
      value: payload.value,
      module: payload.moduleName,
    },
  });
};

export const localizationService = {
  updateExchangeRate,
  setTranslationKey,
};
