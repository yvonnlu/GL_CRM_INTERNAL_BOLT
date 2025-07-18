import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Leads from './components/Leads/Leads';
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
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <Leads />;
      case 'clients':
        return <Clients />;
      case 'pipeline':
        return <Pipeline />;
      case 'tasks':
        return <Tasks />;
      case 'clickup':
        return <ClickUpIntegration />;
      case 'communication':
        return <Communication />;
      case 'chatwoot':
        return <ChatwootIntegration />;
      case 'reports':
        return <Reports />;
      case 'analytics':
        return <WebsiteAnalytics />;
      case 'quotations':
        return <QuotationCreator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;