import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BeneficiaryResponse, Beneficiary } from "@/type/project-beneficiaries/beneficiary";

// 1. Get All Beneficiaries
export const fetchBeneficiaries = createAsyncThunk<BeneficiaryResponse>(
  "beneficiaries/fetchBeneficiaries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<BeneficiaryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries`
      );
      // console.log("res.data:", res.data);
      
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching beneficiaries"
      );
    }
  }
);


// old code:
// 2. Get Beneficiaries by Project ID
// export const fetchBeneficiariesByProjectId = createAsyncThunk<
//   BeneficiaryResponse,
//   string
// >(
//   "beneficiaries/fetchBeneficiariesByProjectId",
//   async (projectId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get<BeneficiaryResponse>(
//         `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries/project/${projectId}`
//       );


//       console.log("res.data:", res.data);



//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data || "Error fetching project beneficiaries"
//       );
//     }
//   }
// );

// new code:
// 2. Get Beneficiaries by Project ID
export const fetchBeneficiariesByProjectId = createAsyncThunk<
  BeneficiaryResponse,
  string
>(
  "beneficiaries/fetchBeneficiariesByProjectId",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axios.get<BeneficiaryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries/project/${projectId}`
      );

      console.log("SUCCESS DATA:", res.data);
      return res.data;
    } catch (error: any) {
      
      const errorMessage = error.response?.data?.message || "Error fetching project beneficiaries";
      
      console.log("ERROR MESSAGE 👈:", errorMessage); 

      return rejectWithValue(errorMessage);
    }
  }
);





// 3. Get Single Beneficiary by ID
export const fetchBeneficiaryById = createAsyncThunk<
  BeneficiaryResponse,
  string
>("beneficiaries/fetchBeneficiaryById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get<BeneficiaryResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries/${id}`
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error fetching beneficiary details"
    );
  }
});

// 4. Create Beneficiary (POST)
export const createBeneficiary = createAsyncThunk<
  BeneficiaryResponse,
  Beneficiary
>("beneficiaries/createBeneficiary", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post<BeneficiaryResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries`,
      data
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error creating beneficiary"
    );
  }
});

// 5. Update Beneficiary (PATCH)
export const updateBeneficiary = createAsyncThunk<
  BeneficiaryResponse,
  { id: string; data: Partial<Beneficiary> }
>(
  "beneficiaries/updateBeneficiary",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch<BeneficiaryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries/${id}`,
        data
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error updating beneficiary"
      );
    }
  }
);

// 6. Delete Beneficiary (DELETE)
export const deleteBeneficiary = createAsyncThunk<BeneficiaryResponse, string>(
  "beneficiaries/deleteBeneficiary",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete<BeneficiaryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-beneficiaries/${id}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error deleting beneficiary"
      );
    }
  }
);