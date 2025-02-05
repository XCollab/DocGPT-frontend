"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, ArrowRight, ChevronRight, Activity, Microscope, Zap, Clock, Shield, Database } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 1

    const scroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const interval = setInterval(scroll, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-medium">DocGPT</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/diagnose">
                <Button variant="ghost">Try Demo</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolling Conditions */}
      <div className="w-full overflow-hidden bg-teal-50/50 border-y mt-16">
        <div ref={scrollRef} className="flex whitespace-nowrap py-4 gap-6 overflow-x-hidden" style={{ width: "200%" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="inline-flex items-center">
                CARDIOVASCULAR
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                ALZHEIMER'S
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                SCLEROSIS
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                COLORECTAL
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                OSTEOPOROSIS
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                MELANOMA
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                GLAUCOMA
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
              <span className="text-gray-400">/</span>
              <span className="inline-flex items-center">
                THYROID DISORDERS
                <span className="ml-1 text-teal-600 text-lg">+</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl lg:text-7xl font-light tracking-tight">
              AI-Powered
              <br />
              Diagnostics.
            </h1>
            <div className="space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light text-teal-600">112.3</span>
                <span className="text-2xl text-teal-600">%</span>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Revolutionizing medical diagnostics with AI-driven imaging solutions. Precise. Fast. Intelligent.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/diagnose">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Try Diagnosis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  API Documentation
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full aspect-square">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20093312-t5ZeIJYOBhnKiTiweiuxgRbTGv2zML.png"
                alt="3D Medical Visualization"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Advanced Medical Imaging Analysis</h2>
            <p className="text-gray-600">
              Our AI-powered platform combines cutting-edge Vision Transformer technology with medical expertise to
              provide accurate and rapid diagnosis across multiple conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Real-time Analysis",
                description: "Get instant results with our high-performance AI models",
              },
              {
                icon: Microscope,
                title: "Multiple Conditions",
                description: "Support for various medical imaging types and conditions",
              },
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Secure processing with full regulatory compliance",
              },
              {
                icon: Database,
                title: "Comprehensive API",
                description: "Easy integration with existing healthcare systems",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock access to diagnostic tools",
              },
              {
                icon: Zap,
                title: "Fast Processing",
                description: "Lightning-fast analysis of medical images",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="h-8 w-8 text-teal-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-light mb-6">Simple API Integration</h2>
                <p className="text-gray-600 mb-8">
                  Integrate our powerful medical diagnosis capabilities into your healthcare applications with just a
                  few lines of code.
                </p>
                <div className="space-y-4">
                  {[
                    "Multiple disease type support",
                    "RESTful API endpoints",
                    "Detailed response format",
                    "Comprehensive documentation",
                    "Sample code & SDKs",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-teal-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg text-sm">
                  {`POST /api/v1/predict
Content-Type: multipart/form-data

{
  "disease_type": "eye",
  "file": <image_file>
}

Response:
{
  "prediction": {
    "condition": "cataract",
    "confidence": 0.95,
    "severity": "moderate"
  },
  "recommendations": [
    "Consult ophthalmologist",
    "Schedule follow-up"
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join healthcare providers worldwide who are using DocGPT to revolutionize their diagnostic capabilities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-teal-400" />
                <span className="text-lg font-medium">DocGPT</span>
              </div>
              <p className="text-gray-400 text-sm">Advanced AI-powered medical diagnosis platform</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Features</li>
                <li>API</li>
                <li>Documentation</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 DocGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

