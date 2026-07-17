"use client";

import React, { useState } from "react";
import { Check, Clock, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Activity {
  title: string;
  date: string;
  location: string;
  points?: number;
  status: "approved" | "pending";
}

interface FormData {
  type: string;
  description: string;
  location: string;
  date: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  type: yup.string().required("Activity type is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  date: yup.string().required("Date is required"),
});

const activitiesData: Activity[] = [
  {
    title: "Registered 5 new members",
    date: "2026-07-09",
    location: "Dhaka",
    points: 50,
    status: "approved",
  },
  {
    title: "Monthly report",
    date: "2026-07-01",
    location: "Dhaka",
    points: 30,
    status: "pending",
  },
];

const activityTypes = [
  "Member Registration",
  "Donor Outreach",
  "Field Visit",
  "Campaign Support",
  "Photo Upload",
];

const Activities: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Submitted ✅");
    reset();
    setShowForm(false);
  };

  // ✅ Cancel handler
  const handleCancel = () => {
    reset();
    setShowForm(false);
  };

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-foreground text-xl font-semibold">
          Total activities: <b className="text-primary">8</b> · Total points: <b className="text-primary">445</b>
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          {showForm ? "Close Form" : "Submit Activity"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card p-8 rounded-[--radius] border border-border shadow-sm max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-lg font-bold mb-6 text-card-foreground">
            New Activity Report
          </h2>

          <div className="mb-4">
            <select {...register("type")} className="w-full p-3 border border-input bg-card text-card-foreground rounded-lg focus:ring-2 focus:ring-ring outline-none">
              <option value="">Select type...</option>
              {activityTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <p className="text-destructive text-xs mt-1">{errors.type?.message}</p>
          </div>

          <div className="mb-4">
            <textarea
              {...register("description")}
              className="w-full p-3 border border-input bg-card text-card-foreground rounded-lg h-24 focus:ring-2 focus:ring-ring outline-none"
              placeholder="Describe..."
            />
            <p className="text-destructive text-xs mt-1">{errors.description?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <input {...register("location")} className="w-full p-3 border border-input bg-card text-card-foreground rounded-lg" placeholder="Location" />
            <input type="date" {...register("date")} className="w-full p-3 border border-input bg-card text-card-foreground rounded-lg" />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">Submit</button>
            <button type="button" onClick={handleCancel} className="px-6 py-2 border border-input text-card-foreground rounded-lg hover:bg-muted">Cancel</button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-card rounded-[--radius] border border-border shadow-sm">
        {activitiesData.map((act, i) => (
          <div key={i} className="flex items-center gap-4 p-5 border-b border-border last:border-0">
            <div className={act.status === "approved" ? "text-chart-2" : "text-chart-1"}>
              {act.status === "approved" ? <Check /> : <Clock />}
            </div>

            <div className="flex-1">
              <h3 className="text-card-foreground font-medium">{act.title}</h3>
              <p className="text-sm text-muted-foreground">{act.date} · {act.location}</p>
            </div>

            <div>
              <p className="font-bold text-primary">+{act.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;