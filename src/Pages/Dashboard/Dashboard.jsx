import Header from "../../Components/Header/Header"
import Cards from "./Cards"
import RecentData from "./RecentData"


const Dashboard = () => {
    return (
        <div className=''>
            <div className="h-24 w-full ">
                <Header />
            </div>
            <Cards />
            <RecentData />
        </div>
    )
}

export default Dashboard