export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 flex items-center justify-center">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* Logo with animation */}
        <div className="animate-bounce">
          <img 
            src="/tm_v3_icon.png" 
            alt="TrustManager" 
            className="w-24 h-24 rounded-xl shadow-2xl shadow-blue-500/30"
          />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 animate-fade-in">
            Trust<span className="text-blue-400">Manager</span>
          </h1>
          <p className="text-slate-400 text-lg animate-fade-in-delay">
            Simplifiez la gestion de votre entreprise
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-6 flex gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          30% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1.2s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
