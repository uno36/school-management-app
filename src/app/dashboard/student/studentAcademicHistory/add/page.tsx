"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define interface for Academic History data
interface StudentAcademicHistoryData {
  pastAcademicPerformance: string;
  gradesAndAchievements: string;
  previousSchoolsAttended: string;
}

const StudentAcademicHistoryForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentAcademicHistoryData>({
    pastAcademicPerformance: "",
    gradesAndAchievements: "",
    previousSchoolsAttended: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Academic History Data Submitted:", formData);
    alert("Student academic history saved successfully!");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Academic History
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="pastAcademicPerformance">
              Past Academic Performance (Notes)
            </Label>
            <Textarea
              id="pastAcademicPerformance"
              placeholder="e.g., Consistently high grades in Math and Science, participated in debate club."
              value={formData.pastAcademicPerformance}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="gradesAndAchievements">
              Grades and Achievements
            </Label>
            <Textarea
              id="gradesAndAchievements"
              placeholder="e.g., GPA 3.8, Honor Roll 2022, Science Fair Winner 2023."
              value={formData.gradesAndAchievements}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="previousSchoolsAttended">
              Previous Schools Attended
            </Label>
            <Textarea
              id="previousSchoolsAttended"
              placeholder="e.g., Springfield Elementary (2018-2021), Oakwood Middle School (2021-2023)."
              value={formData.previousSchoolsAttended}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Save Academic History
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentAcademicHistoryForm;
