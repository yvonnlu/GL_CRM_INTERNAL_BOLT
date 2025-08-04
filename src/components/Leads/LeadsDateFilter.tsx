import React from 'react';
import { Calendar } from 'lucide-react';

interface LeadsDateFilterProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    applyDateFilter: () => void;
    resetDateFilter: () => void;
}

const LeadsDateFilter: React.FC<LeadsDateFilterProps> = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    applyDateFilter,
    resetDateFilter,
}) => {
    return (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="flex flex-col">
                        <label
                            htmlFor="startDate"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            From Date
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Calendar className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="pl-10 py-2 px-3 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
                            To Date
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Calendar className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="pl-10 py-2 px-3 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={applyDateFilter}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
                    >
                        Apply Filter
                    </button>
                    <button
                        onClick={resetDateFilter}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex-1 sm:flex-none"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadsDateFilter;
