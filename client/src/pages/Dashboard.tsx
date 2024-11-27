import MDDashboard from "../components/MDDashboard"
import ODDashboard from "../components/ODDashboard"

const Dashboard = () => {
  return (
    <>
      {
        (localStorage.getItem("doctype") === '2' ) ?
            <ODDashboard/> : <MDDashboard/>
      }
    </>
  )
}

export default Dashboard