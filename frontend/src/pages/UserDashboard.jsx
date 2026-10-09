
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import Route from "./Route";
import SavedQuotations from "./SavedQuotations";
import Feedback from "./Feedback";
import HelpSupport from "./HelpSupport";

function UserDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("activity");
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoadingDashboard(true);
        setDashboardError("");

        const userResponse = await fetch(
          "http://localhost:8000/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!userResponse.ok) {
          navigate("/login");
          return;
        }

        const userData = await userResponse.json();

        if (!userData.success || !userData.user) {
          navigate("/login");
          return;
        }

        setCurrentUser(userData.user);

        const dashboardResponse = await fetch(
          "http://localhost:8000/api/user-dashboard/",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!dashboardResponse.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const dashboardResult = await dashboardResponse.json();

        if (dashboardResult.status !== "success") {
          throw new Error(
            dashboardResult.message ||
              "Unable to load dashboard data."
          );
        }

        setDashboardData(dashboardResult);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setDashboardError(
          "Unable to load dashboard data at this moment."
        );
      } finally {
        setLoadingDashboard(false);
      }
    };

    loadDashboard();
  }, [navigate, activePage]);

  const userName = currentUser?.name || "User";

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:8000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/");
    }
  };

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const kpis = dashboardData?.kpis || {};

  const totalRoutes = kpis.total_routes ?? 0;
  const savedQuotations = kpis.saved_quotations ?? 0;

  const averageFreightCost = Number(
    kpis.average_freight_cost ?? 0
  );

  const averageTransitTime = Number(
    kpis.average_transit_time ?? 0
  );

  const approvedQuotations =
    kpis.approved_quotations ?? 0;

  const pendingQuotations =
    kpis.pending_quotations ?? 0;

  const rejectedQuotations =
    kpis.rejected_quotations ?? 0;

  const graphData = dashboardData?.graphs || {};

  const quotationStatus =
    graphData?.quotation_status_overview || {};

  const quotationStatusData = [
    {
      name: "Approved",
      value: Number(quotationStatus.approved ?? 0),
    },
    {
      name: "Pending",
      value: Number(quotationStatus.pending ?? 0),
    },
    {
      name: "Rejected",
      value: Number(quotationStatus.rejected ?? 0),
    },
  ];

  const quotationStatusColors = [
    "#42D9E8",
    "#4696ED",
    "#58CDB6",
  ];

  const freightCostData =
    graphData?.freight_cost_by_route || [];

  const transitTimeData =
    graphData?.transit_time_overview || [];

  const recentActivity =
    dashboardData?.recent_activity || [];

  const getActivityLabel = (activityType) => {
    switch (activityType) {
      case "route_analysis":
        return "Route Analyzed";
      case "route_saved":
        return "Route Saved";
      case "base_cost_calculation":
        return "Base Cost Calculated";
      case "pricing_analysis":
        return "Price Calculated";
      case "quotation_saved":
        return "Quotation Saved";
      case "quotation_approval_requested":
        return "Quotation Approval Requested";
      case "quotation_pdf_downloaded":
        return "Quotation PDF Downloaded";
      default:
        return "Activity";
    }
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case "route_analysis":
        return "⌕";
      case "route_saved":
        return "✓";
      case "base_cost_calculation":
        return "◈";
      case "pricing_analysis":
        return "$";
      case "quotation_saved":
        return "▥";
      case "quotation_approval_requested":
        return "↗";
      case "quotation_pdf_downloaded":
        return "↓";
      default:
        return "•";
    }
  };

  const formatActivityDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="user-dashboard-page">
      <aside className="user-sidebar">
        <div className="sidebar-header">
          <h2>MARITIME</h2>
          <p>USER DASHBOARD</p>
        </div>

        <nav className="sidebar-navigation">
          <button
            className={`sidebar-item ${
              activePage === "activity" ? "active" : ""
            }`}
            onClick={() => handleNavigation("activity")}
          >
            <span className="sidebar-icon">⌂</span>
            <span>Activity</span>
          </button>

          <div className="sidebar-section">
            <div className="sidebar-section-title">
              ROUTE INTELLIGENCE
            </div>

            <button
              className={`sidebar-item ${
                activePage === "new-route-search"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation("new-route-search")
              }
            >
              <span className="sidebar-icon">⌕</span>
              <span>New Route Search</span>
            </button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">
              PRICE INTELLIGENCE
            </div>

            <button
              className={`sidebar-item ${
                activePage === "saved-quotations"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation("saved-quotations")
              }
            >
              <span className="sidebar-icon">▥</span>
              <span>Saved Quotations</span>
            </button>
          </div>

        
<button
  className={`sidebar-item ${
    activePage === "feedback" ? "active" : ""
  }`}
  onClick={() => handleNavigation("feedback")}
>
  <span className="sidebar-icon">✦</span>
  <span>Feedback</span>
</button>

<button
  className={`sidebar-item ${
    activePage === "help-support" ? "active" : ""
  }`}
  onClick={() => handleNavigation("help-support")}
>
  <span className="sidebar-icon">?</span>
  <span>Help & Support</span>
</button>

        </nav>

        <div className="sidebar-bottom">
          <div className="logged-user">
            <div className="user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="logged-user-info">
              <span className="logged-user-label">
                Logged in as
              </span>
              <strong>{userName}</strong>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="user-dashboard-main">
        {activePage === "activity" && (
          <section className="activity-page">
            <div className="dashboard-page-header">
              <div>
                <p className="dashboard-eyebrow">
                  MARITIME INTELLIGENCE
                </p>

                <h1>Activity Dashboard</h1>

                <p>
                  Monitor your route and freight pricing
                  information from one place.
                </p>
              </div>
            </div>

            {dashboardError && (
              <div className="dashboard-error-message">
                {dashboardError}
              </div>
            )}

            <div className="dashboard-kpi-grid">
              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">◉</div>
                <div className="kpi-card-content">
                  <span>Total Routes</span>
                  <strong>
                    {loadingDashboard ? "..." : totalRoutes}
                  </strong>
                  <small>Available routes</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">▥</div>
                <div className="kpi-card-content">
                  <span>Saved Quotations</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : savedQuotations}
                  </strong>
                  <small>Quotations saved by you</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">$</div>
                <div className="kpi-card-content">
                  <span>Average Freight Cost</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : `$${averageFreightCost.toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}`}
                  </strong>
                  <small>Average per container</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">◷</div>
                <div className="kpi-card-content">
                  <span>Average Transit Time</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : `${averageTransitTime.toFixed(1)} days`}
                  </strong>
                  <small>Average route transit time</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">✓</div>
                <div className="kpi-card-content">
                  <span>Approved Quotations</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : approvedQuotations}
                  </strong>
                  <small>Quotations approved by Admin</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">◷</div>
                <div className="kpi-card-content">
                  <span>Pending Quotations</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : pendingQuotations}
                  </strong>
                  <small>Waiting for Admin review</small>
                </div>
              </div>

              <div className="dashboard-kpi-card">
                <div className="kpi-card-icon">×</div>
                <div className="kpi-card-content">
                  <span>Rejected Quotations</span>
                  <strong>
                    {loadingDashboard
                      ? "..."
                      : rejectedQuotations}
                  </strong>
                  <small>Quotations rejected by Admin</small>
                </div>
              </div>
            </div>

            <div className="dashboard-graph-grid">
              <div className="dashboard-graph-card">
                <div className="graph-card-header">
                  <h2>Quotation Status Overview</h2>
                  <p>Your quotation approval status</p>
                </div>

                <div className="graph-container">
                  {loadingDashboard ? (
                    <div className="graph-loading">
                      Loading chart...
                    </div>
                  ) : quotationStatusData.every(
                      (item) => item.value === 0
                    ) ? (
                    <div className="graph-empty">
                      No quotation data available
                    </div>
                  ) : (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>
                        <Pie
                          data={quotationStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                        >
                          {quotationStatusData.map(
                            (entry, index) => (
                              <Cell
                                key={`status-${index}`}
                                fill={
                                  quotationStatusColors[index]
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="dashboard-graph-card">
                <div className="graph-card-header">
                  <h2>Freight Cost by Route</h2>
                  <p>Base freight per container</p>
                </div>

                <div className="graph-container">
                  {loadingDashboard ? (
                    <div className="graph-loading">
                      Loading chart...
                    </div>
                  ) : freightCostData.length === 0 ? (
                    <div className="graph-empty">
                      No route quotation data available
                    </div>
                  ) : (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={freightCostData}
                        margin={{
                          top: 10,
                          right: 15,
                          left: 0,
                          bottom: 45,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis
                          dataKey="route_id"
                          angle={-35}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="freight_cost"
                          name="Freight Cost (USD)"
                          fill="#42D9E8"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="dashboard-graph-card">
                <div className="graph-card-header">
                  <h2>Transit Time Overview</h2>
                  <p>Transit days by selected route</p>
                </div>

                <div className="graph-container">
                  {loadingDashboard ? (
                    <div className="graph-loading">
                      Loading chart...
                    </div>
                  ) : transitTimeData.length === 0 ? (
                    <div className="graph-empty">
                      No transit time data available
                    </div>
                  ) : (
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <LineChart
                        data={transitTimeData}
                        margin={{
                          top: 10,
                          right: 15,
                          left: 0,
                          bottom: 45,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis
                          dataKey="route_id"
                          angle={-35}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="transit_days"
                          name="Transit Days"
                          stroke="#4696ED"
                          strokeWidth={4}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            <div className="dashboard-section-card">
              <div className="section-card-header">
                <div>
                  <h2>Recent Activity</h2>
                  <p>
                    Your latest route and freight pricing
                    activities will appear here.
                  </p>
                </div>
              </div>

              {loadingDashboard ? (
                <div className="empty-activity-state">
                  <div className="empty-activity-icon">◌</div>
                  <h3>Loading activity...</h3>
                  <p>Fetching your latest activities.</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="empty-activity-state">
                  <div className="empty-activity-icon">◌</div>
                  <h3>No recent activity</h3>
                  <p>
                    Start by analyzing a route to see your
                    activity history here.
                  </p>
                  <button
                    className="primary-dashboard-button"
                    onClick={() =>
                      handleNavigation("new-route-search")
                    }
                  >
                    Start New Route Search
                  </button>
                </div>
              ) : (
                <div className="recent-activity-list">
                  {recentActivity.map((activity) => (
                    <div
                      className="recent-activity-item"
                      key={activity.id}
                    >
                      <div className="recent-activity-icon">
                        {getActivityIcon(activity.activity_type)}
                      </div>

                      <div className="recent-activity-content">
                        <strong>
                          {getActivityLabel(
                            activity.activity_type
                          )}
                        </strong>
                        <p>
                          {activity.description ||
                            "Activity completed"}
                        </p>
                      </div>

                      <div className="recent-activity-date">
                        {formatActivityDate(
                          activity.created_at
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === "new-route-search" && <Route />}

        {activePage === "saved-quotations" && (
          <SavedQuotations />
        )}

        {activePage === "feedback" && <Feedback />}
{activePage === "help-support" && <HelpSupport />}
      </main>
    </div>
  );
}

export default UserDashboard;
