
import {
  LayoutDashboard, GitBranch, Container, Boxes,
  Activity, Settings, Bell, Search, ArrowUpRight,
  ArrowDownRight, CheckCircle2, Clock, XCircle,
  Terminal, Rocket, Server
} from "lucide-react";
import "./App.css";

const deployments = [
  { name: "frontend-app", branch: "main", status: "Success", time: "2 min ago", version: "v1.4.2" },
  { name: "api-service", branch: "develop", status: "Running", time: "12 min ago", version: "v2.1.0" },
  { name: "auth-service", branch: "main", status: "Failed", time: "28 min ago", version: "v1.0.8" },
  { name: "payment-service", branch: "main", status: "Success", time: "1 hour ago", version: "v1.8.3" },
];

const stages = ["Code", "Build", "Test", "Docker", "Deploy"];

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Rocket size={22} /></div>
          <span>Deploy<span className="accent">IQ</span></span>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <nav>
          <a className="active"><LayoutDashboard size={18}/> Overview</a>
          <a><GitBranch size={18}/> Pipelines</a>
          <a><Container size={18}/> Containers</a>
          <a><Boxes size={18}/> Kubernetes</a>
          <a><Activity size={18}/> Monitoring</a>
          <a><Terminal size={18}/> Build Logs</a>
        </nav>

        <div className="sidebar-bottom">
          <a><Settings size={18}/> Settings</a>
          <div className="profile">
            <div className="avatar">D</div>
            <div><strong>Developer</strong><small>Admin workspace</small></div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Deployment Overview</h1>
            <p className="subtitle">Monitor your applications and deployment activity.</p>
          </div>
          <div className="top-actions">
            <button className="icon-button"><Search size={19}/></button>
            <button className="icon-button"><Bell size={19}/></button>
            <button className="deploy-button"><Rocket size={16}/> New deployment</button>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow light">YOUR DEVOPS COMMAND CENTER</p>
            <h2>Build. Deploy. Monitor.</h2>
            <p>Everything your engineering workflow needs, in one place.</p>
          </div>
          <div className="welcome-icon"><Server size={58}/></div>
        </section>

        <section className="metrics">
          <Metric title="Total Deployments" value="128" change="+12.5%" icon={<Rocket/>} trend="up"/>
          <Metric title="Successful Builds" value="112" change="+8.2%" icon={<CheckCircle2/>} trend="up"/>
          <Metric title="Failed Builds" value="08" change="-2.4%" icon={<XCircle/>} trend="down"/>
          <Metric title="Avg. Build Time" value="2m 34s" change="-14.8%" icon={<Clock/>} trend="up"/>
        </section>

        <section className="content-grid">
          <div className="panel pipeline-panel">
            <div className="panel-heading">
              <div><h3>CI/CD Pipeline</h3><p>Latest pipeline execution</p></div>
              <span className="live-tag"><span/> LIVE</span>
            </div>
            <div className="pipeline">
              {stages.map((stage, index) => (
                <div className="stage" key={stage}>
                  <div className={`stage-icon ${index < 4 ? "completed" : "pending"}`}>
                    {index < 4 ? <CheckCircle2 size={19}/> : <Clock size={19}/>}
                  </div>
                  <strong>{stage}</strong>
                  <small>{index < 4 ? "Completed" : "Waiting"}</small>
                </div>
              ))}
            </div>
            <div className="pipeline-footer">
              <span>Pipeline #128</span>
              <span>Triggered 2 minutes ago</span>
            </div>
          </div>

          <div className="panel health-panel">
            <div className="panel-heading">
              <div><h3>System Health</h3><p>Environment status</p></div>
              <Activity size={19}/>
            </div>
            <div className="health-score">98.5<span>%</span></div>
            <p className="health-caption">All systems operational</p>
            <div className="health-bar"><div/></div>
            <div className="health-details">
              <span><i className="green-dot"/> Production</span>
              <strong>Healthy</strong>
            </div>
            <div className="health-details">
              <span><i className="green-dot"/> Staging</span>
              <strong>Healthy</strong>
            </div>
          </div>
        </section>

        <section className="panel deployment-panel">
          <div className="panel-heading">
            <div><h3>Recent Deployments</h3><p>Track your latest application releases</p></div>
            <button className="view-button">View all <ArrowUpRight size={15}/></button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>APPLICATION</th><th>BRANCH</th><th>VERSION</th><th>STATUS</th><th>TIME</th></tr>
              </thead>
              <tbody>
                {deployments.map((item) => (
                  <tr key={item.name}>
                    <td className="app-name"><div className="app-symbol"><Container size={16}/></div>{item.name}</td>
                    <td><GitBranch size={13} className="inline-icon"/> {item.branch}</td>
                    <td>{item.version}</td>
                    <td><span className={`status ${item.status.toLowerCase()}`}><i/> {item.status}</span></td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer>DeployIQ © 2026 · Built for better deployments.</footer>
      </main>
    </div>
  );
}

function Metric({ title, value, change, icon, trend }) {
  return (
    <div className="panel metric">
      <div className="metric-top"><span>{title}</span><div className="metric-icon">{icon}</div></div>
      <div className="metric-bottom">
        <strong>{value}</strong>
        <span className={trend === "up" ? "trend-up" : "trend-down"}>
          {trend === "up" ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
          {change}
        </span>
      </div>
      <small>Compared to last month</small>
    </div>
  );
}

export default App;
