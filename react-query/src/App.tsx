import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './pages/Routes';
import 'antd/dist/antd.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
