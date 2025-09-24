export interface AssessmentData {
  session_id: string;
  assessment_id: string;
  accuracy: number;
  vitalsMap?: {
    vitals?: {
      heart_rate?: number;
      bp_sys?: number;
      bp_dia?: number;
    };
  };
  bodyCompositionData?: {
    BMI?: string;
  };
}

export const dataset: AssessmentData[] = [
  {
    session_id: "session_001",
    assessment_id: "as_hr_02",
    accuracy: 80,
    vitalsMap: { vitals: { heart_rate: 75, bp_sys: 124, bp_dia: 82 } },
    bodyCompositionData: { BMI: "33.145" }
  },
  {
    session_id: "session_002",
    assessment_id: "as_card_01",
    accuracy: 17,
    vitalsMap: { vitals: { heart_rate: 66, bp_sys: 110, bp_dia: 75 } },
    bodyCompositionData: { BMI: "26.23" }
  }
];

// Add this line to provide a default export:
export default dataset;

