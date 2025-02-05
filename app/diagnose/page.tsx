"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Eye,
  Heart,
  TreesIcon as Lungs,
  Microscope,
  ArrowLeft,
  Upload,
  Loader2,
  AlertCircle,
  Activity,
  Check,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const diseaseTypes = [
  {
    id: "eye",
    name: "Eye Diseases",
    description: "Cataract, Glaucoma, Diabetic Retinopathy",
    icon: Eye,
    color: "teal",
  },
  {
    id: "skin",
    name: "Skin Cancer",
    description: "Melanoma Detection",
    icon: Microscope,
    color: "teal",
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "X-ray Analysis",
    icon: Lungs,
    color: "teal",
  },
  {
    id: "brain",
    name: "Brain Tumor",
    description: "Coming Soon",
    icon: Brain,
    color: "gray",
    disabled: true,
  },
  {
    id: "heart",
    name: "Heart Disease",
    description: "Coming Soon",
    icon: Heart,
    color: "gray",
    disabled: true,
  },
]

interface AnalysisResult {
  prediction: {
    condition: string
    confidence: number
    severity: "mild" | "moderate" | "severe"
  }
  recommendations: string[]
}

export default function DiagnosePage() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState("upload")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedType || !selectedImage) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("disease_type", selectedType)
      formData.append("file", selectedImage)

      const response = await fetch("/api/v1/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setResult(data)
      setActiveTab("results")
    } catch (err) {
      setError("Failed to analyze image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <Activity className="h-8 w-8 text-teal-600" />
              <div>
                <h1 className="text-2xl font-medium">Medical Image Analysis</h1>
                <p className="text-gray-600">Upload an image for AI-powered diagnosis</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="results">
                  <Activity className="h-4 w-4 mr-2" />
                  Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-8">
                <div>
                  <Label className="text-base">Select Disease Type</Label>
                  <RadioGroup
                    value={selectedType}
                    onValueChange={setSelectedType}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                  >
                    {diseaseTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.id}>
                          <RadioGroupItem
                            value={type.id}
                            id={type.id}
                            className="peer sr-only"
                            disabled={type.disabled}
                          />
                          <Label
                            htmlFor={type.id}
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer
                              ${type.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
                              peer-checked:border-teal-500 peer-checked:ring-1 peer-checked:ring-teal-500`}
                          >
                            <div className={`rounded-full bg-${type.color}-100 p-2`}>
                              <Icon className={`h-6 w-6 text-${type.color}-600`} />
                            </div>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </RadioGroup>
                </div>

                {selectedType && (
                  <div>
                    <Label className="text-base">Upload Image</Label>
                    <div className="mt-3">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-8 w-8 text-gray-400 mb-4" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
                            </div>
                          )}
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {selectedType && selectedImage && (
                  <Button onClick={handleSubmit} disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="results">
                {result ? (
                  <div className="space-y-8">
                    <Alert>
                      <Check className="h-4 w-4" />
                      <AlertTitle>Analysis Complete</AlertTitle>
                      <AlertDescription>The image has been successfully analyzed using our AI model.</AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Diagnosis</h3>
                        <Card className="p-4">
                          <div className="space-y-4">
                            <div>
                              <Label>Condition</Label>
                              <p className="text-lg font-medium text-teal-600">{result.prediction.condition}</p>
                            </div>
                            <div>
                              <Label>Confidence</Label>
                              <div className="space-y-2">
                                <Progress value={result.prediction.confidence * 100} className="h-2" />
                                <p className="text-sm text-gray-600">
                                  {(result.prediction.confidence * 100).toFixed(1)}% confidence
                                </p>
                              </div>
                            </div>
                            <div>
                              <Label>Severity</Label>
                              <p className="capitalize text-gray-700">{result.prediction.severity}</p>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                        <Card className="p-4">
                          <ul className="space-y-2">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-teal-600 mt-1" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          setSelectedImage(null)
                          setImagePreview("")
                          setResult(null)
                          setActiveTab("upload")
                        }}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        New Analysis
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.print()}
                        className="border-teal-600 text-teal-600 hover:bg-teal-50"
                      >
                        Download Report
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No analysis results yet. Upload and analyze an image to see results here.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

