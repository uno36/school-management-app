// frontend/components/student/StudentHealthRecordsForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";

interface StudentHealthRecordsData {
  medicalConditions: string;
  allergies: string;
  immunizations: string;
  doctorName: string;
  doctorPhone: string;
}

export function StudentHealthRecordsForm() {
  const [formData, setFormData] = useState<StudentHealthRecordsData>({
    medicalConditions: "",
    allergies: "",
    immunizations: "",
    doctorName: "",
    doctorPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Health Records Submitted:", formData);
    alert("Student health records saved successfully!");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Health & Medical Records
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <Textarea
              id="medicalConditions"
              placeholder="e.g., Asthma, Diabetes, Heart Condition."
              value={formData.medicalConditions}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              placeholder="e.g., Penicillin, Peanuts, Bee Stings."
              value={formData.allergies}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="immunizations">Immunizations</Label>
            <Textarea
              id="immunizations"
              placeholder="e.g., DTP, MMR, Polio (dates if available)."
              value={formData.immunizations}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctorName">Doctor&#39;s Name</Label>
              <Input
                id="doctorName"
                type="text"
                placeholder="Dr. Emily White"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="doctorPhone">Doctor&#39;s Phone</Label>
              <Input
                id="doctorPhone"
                type="tel"
                placeholder="+1 (555) 333-4444"
                value={formData.doctorPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Save Health Records
          </Button>
        </form>
      </div>
    </div>
  );
}

export default StudentHealthRecordsForm;
