/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CertificateVerification() {
  const [certificateNo, setCertificateNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult("No data found");
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen flex flex-col justify-center items-center  shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold  mb-4">Certificate Verification</h2>
      <Input
        type="text"
        placeholder="Enter Certificate No"
        value={certificateNo}
        onChange={(e) => setCertificateNo(e.target.value)}
        className="mb-4"
      />
      <Button
        onClick={handleVerify}
        disabled={!certificateNo || loading}
        className="w-full"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2" size={18} />
        ) : (
          "Verify"
        )}
      </Button>
      {result && !loading && (
        <p className="mt-4 text-red-500 text-center">{result}</p>
      )}
    </div>
  );
}
