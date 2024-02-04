"use client"

import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav className="nav-side-menu">
        <div className="menu-list">
          <ul id="menu-content" className="menu-content collapse out">
            <li>
              <Link href="/dashboard">
                <i className="fa fa-fw fa-dashboard fa-lg"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link href="/monitor">
                <i className="fa fa-fw fa-dashboard fa-lg"></i>Monitoring
              </Link>
            </li>
            <li data-toggle="collapse" data-target="#messaging" className="collapsed" data-parent="#menu-content">
              <Link href="#">
                <i className="fa fa-fw fa-gift fa-lg"></i>MLSN
                <i className="fa fa-chevron-down"></i>
              </Link>
            </li>
            <ul className="sub-menu collapse show" id="messaging">
              <li className="nav-item active"><Link href="/mlsnm">Message VPNs</Link></li>
              <li className="nav-item"><Link href="/channelList">Queues</Link></li>
            </ul>
            {/* <li data-toggle="collapse" data-target="#system" className="collapsed" data-parent="#menu-content">
              <a href="#">
                <i className="fa fa-fw fa-table fa-lg"></i>MSN
                <i className="fa fa-chevron-down"></i>
              </a>
            </li>
            <ul className="sub-menu collapse show" id="system">
              <li><a href="/stats">Statistics</a></li>
            </ul> */}
            <li data-toggle="collapse" data-target="#admins" className="collapsed" data-parent="#menu-content">
              <a href="#">
                <i className="fa fa-fw fa-table fa-lg"></i>EMMA
                <i className="fa fa-chevron-down"></i>
              </a>
            </li>
            <ul className="sub-menu collapse show" id="admins">
              {/* <li><Link href={"#"}>User Management</Link></li> */}
              <li><Link href={"#"}>Alert Management</Link></li>
            </ul>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
