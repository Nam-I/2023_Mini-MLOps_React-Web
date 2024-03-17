import Aside from "../components/Aside";
import PieChart from "../components/PieChart";
import UserCount from "../components/UserCount";
import DataCount from "../components/DataCount";
import CurrentModel from "../components/CurrentModel";
import "react-datepicker/dist/react-datepicker.css";

function DashBord() {
  return (
    <div className="g-sidenav-show bg-gray-100" id="fontList">
      <div className="min-height-250 bg-primary position-absolute w-100"></div>
      <Aside />
      <main className="main-content position-relative border-radius-lg">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card z-index-2 h-100">
                <div className="card-body p-4">
                  <div
                    id="carouselExampleCaptions"
                    className="carousel slide h-100"
                    data-bs-ride="carousel"
                  >
                    <DataCount />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card card-carousel overflow-hidden h-100 p-4">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide h-100"
                  data-bs-ride="carousel"
                >
                  <UserCount />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-7 mb-lg-0 mb-0">
              <div className="card z-index-2 h-100">
                <div className="card-body p-4">
                  <div className="chart">
                    <CurrentModel />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card card-carousel overflow-hidden h-100 p-4">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide h-100"
                  data-bs-ride="carousel"
                >
                  <div id="dashBordTestPieChart">
                    <h2>User Satisfaction</h2>
                    <div className="pt-2">
                      <PieChart />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev w-5 me-3"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next w-5 me-3"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <footer className="footer pt-3  ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-lg-between">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <div className="copyright text-center text-sm text-muted text-lg-start">
                    © <script>document.write(new Date().getFullYear())</script>,
                    made with <i className="fa fa-heart"></i> by namiso
                  </div>
                </div>
              </div>
            </div>
          </footer> */}
        </div>
      </main>
    </div>
  );
}

export default DashBord;
