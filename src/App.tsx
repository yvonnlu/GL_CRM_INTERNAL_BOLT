import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Leads from './components/Leads/Leads';
import LeadDetail from './components/Leads/LeadDetail';
import Clients from './components/Clients/Clients';
import Pipeline from './components/Pipeline/Pipeline';
import Tasks from './components/Tasks/Tasks';
import Communication from './components/Communication/Communication';
import Reports from './components/Reports/Reports';
import WebsiteAnalytics from './components/Analytics/WebsiteAnalytics';
import ChatwootIntegration from './components/Chatwoot/ChatwootIntegration';
import ClickUpIntegration from './components/Tasks/ClickUpIntegration';
import QuotationCreator from './components/Quotation/QuotationCreator';
import Settings from './components/Settings/Settings';

function App() {
    const location = useLocation();
    const currentPath = location.pathname.substring(1) || 'dashboard';

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar activeTab={currentPath} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/leads/:leadId" element={<Leads />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/pipeline" element={<Pipeline />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/clickup" element={<ClickUpIntegration />} />
                        <Route path="/communication" element={<Communication />} />
                        <Route path="/chatwoot" element={<ChatwootIntegration />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/analytics" element={<WebsiteAnalytics />} />
                        <Route path="/quotations" element={<QuotationCreator />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
