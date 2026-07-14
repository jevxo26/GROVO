import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FlowStep {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgColor: string;
}

interface DonationFlowProps {
  steps: FlowStep[];
}

export const DonationFlow: React.FC<DonationFlowProps> = ({ steps }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Your Donation Flow</h2>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Card */}
            <div className={`flex-1 w-full p-6 rounded-2xl flex flex-col items-center text-center ${step.bgColor}`}>
              <div className="mb-3 text-gray-700">{step.icon}</div>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.subtitle}</p>
            </div>

            {/* Arrow (Hidden on last item) */}
            {index < steps.length - 1 && (
              <ArrowRight className="text-gray-400 rotate-90 md:rotate-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};