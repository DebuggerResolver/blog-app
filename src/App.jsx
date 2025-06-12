import Layout from './components/layout';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/not-found';
import Edit from './pages/edit';
import Add from './pages/add';
import View from './pages/view';
import { ItemsProvider } from './context/ItemsContext';
import Form from './components/form';
import Table from './components/table/Table';

const App = () => {
  return (
    <ItemsProvider>
      <div>
        <Routes>
          <Route element={<Layout />} path="/" />
          <Route element={<Add />} path="/add" />
          <Route element={<View />} path="/view/:id" />
          <Route element={<Edit />} path="/edit/:id" />
          <Route element={<NotFound />} path="*" />
        </Routes>
        <Form />
        <Table />
      </div>
    </ItemsProvider>
  );
};

export default App;