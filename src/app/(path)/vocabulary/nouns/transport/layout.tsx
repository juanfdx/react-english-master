import { Outlet } from 'react-router';
import { Breadcrumbs } from '../../../../../components/shared/Breadcrumbs';



export default function TransportLayout() {

  return (
    <> 
      <Breadcrumbs className="mt-4" />

      <div className="mt-4">
        <Outlet />
      </div>

    </>
  );
}