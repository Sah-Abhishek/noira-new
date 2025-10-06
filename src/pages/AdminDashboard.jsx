import ActiveAndInactiveTherapist from "../components/adminDashboard/ActiveTherapistTable";
import ActiveTherapistGraph from "../components/adminDashboard/AdminGraph/ActiveTherapists";
import AdminHeaderComponent from "../components/adminDashboard/AdminHeaderComponent";
import AdminSidebar from "../components/adminDashboard/AdminSidebar";
import RevenueDashboard from "../components/adminDashboard/RevenueDashboard";
import StatusCardRow from "../components/adminDashboard/StatusCardsRow";

const AdminDashoboard = () => {

  return (
    <div className="text-white bg-black min-h-screen">

      <AdminHeaderComponent />
      <StatusCardRow />
      <ActiveAndInactiveTherapist />
      {/* <RevenueDashboard /> */}
      <div className="p-8">
        <ActiveTherapistGraph />

      </div>
    </div>

  )
}

export default AdminDashoboard;
