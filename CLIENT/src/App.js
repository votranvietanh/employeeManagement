
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import EmployeePage from './pages/EmployeePage';
import DetailPage from './pages/DetailPage';
import TeamPage from './pages/TeamPage';
import NavigateBar from './features/global/NavigateBar';
import UserPage from './pages/UserPage';
import { Suspense } from 'react';
import UserForgetPassword from './features/user/UserForgetPassword';
import LoadingScreen from './features/global/LoadingScreen'
import AdminPage from './pages/AdminPage';
import UserInfo from './features/user/UserInfo';
// import UserRegister from './features/user/UserRegister';


const queryClient = new QueryClient({});

function App() {

  return (
    <Suspense fallback="...is loading">
      <QueryClientProvider client={queryClient}>
        <div className="wrapper">
          <BrowserRouter>
            <NavigateBar />
            <Routes>
              <Route path="/" element={<UserPage />} />
              <Route path="/employee/:employeeid" element={<DetailPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/employee" element={<EmployeePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="user/:userid" element={<UserInfo />} />
              <Route path="/forget" element={<UserForgetPassword />} />
              <Route path="/test" element={<LoadingScreen />} />
              {/* <Route path="/signup" element={<UserRegister />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Suspense>
  );
}
export default App;
