export interface AnalysisResult {
  diagnosis: {
    condition: string
    details: string
    severity: "low" | "medium" | "high"
  }
  confidence: number
  recommendations?: string[]
  metadata: {
    modelVersion: string
    processingTime: number
    imageQuality: string
  }
}

