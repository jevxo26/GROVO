import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBeneficiaries,
  fetchBeneficiariesByProjectId,
  fetchBeneficiaryById,
  createBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
} from "@/redux/api/project-beneficiaries/beneficiaryApi";
import { Beneficiary } from "@/type/project-beneficiaries/beneficiary";

interface BeneficiaryState {
  beneficiaries: Beneficiary[];
  selectedBeneficiary: Beneficiary | null;
  loading: boolean;
  error: string | null;
}

const initialState: BeneficiaryState = {
  beneficiaries: [],
  selectedBeneficiary: null,
  loading: false,
  error: null,
};

const beneficiarySlice = createSlice({
  name: "beneficiaries",
  initialState,
  reducers: {
    clearSelectedBeneficiary: (state) => {
      state.selectedBeneficiary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchBeneficiaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeneficiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.beneficiaries = (action.payload.data as Beneficiary[]) || [];
      })
      .addCase(fetchBeneficiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch";
      })

      // Fetch By Project ID
      .addCase(fetchBeneficiariesByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeneficiariesByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.beneficiaries = (action.payload.data as Beneficiary[]) || [];
      })
      .addCase(fetchBeneficiariesByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch project beneficiaries";
      })

      // Fetch Single Beneficiary By ID
      .addCase(fetchBeneficiaryById.fulfilled, (state, action) => {
        state.selectedBeneficiary = action.payload.data as Beneficiary;
      })

      // Create
      .addCase(createBeneficiary.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.beneficiaries.push(action.payload.data as Beneficiary);
        }
      })

      // Update
      .addCase(updateBeneficiary.fulfilled, (state, action) => {
        const updated = action.payload.data as Beneficiary;
        if (updated?.id) {
          const index = state.beneficiaries.findIndex((b) => b.id === updated.id);
          if (index !== -1) {
            state.beneficiaries[index] = updated;
          }
        }
      })

      // Delete
      .addCase(deleteBeneficiary.fulfilled, (state, action) => {
        const deletedId = action.meta.arg; // pass করা id
        state.beneficiaries = state.beneficiaries.filter((b) => b.id !== deletedId);
      });
  },
});

export const { clearSelectedBeneficiary } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;