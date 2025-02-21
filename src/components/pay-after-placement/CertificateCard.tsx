import Image from "next/image";

const CertificateCard = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 ">
        Get Your Recognized Certificate 🎓
      </h2>
      <p className="text-lg md:text-xl text-center mb-8 max-w-2xl ">
        Complete the course and receive a <strong>verified certificate</strong>{" "}
        to boost your career.
      </p>

      {/* Certificate Image with Light Blue Shadow */}
      <div className="relative group">
        <div className="absolute -inset-2 rounded-lg blur-xl opacity-50 group-hover:opacity-70 transition-opacity bg-purple-500"></div>
        <Image
          src="/full-stack-certificate.png" // Replace with your actual certificate image path
          alt="Course Completion Certificate"
          width={600}
          height={400}
          className="rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default CertificateCard;
