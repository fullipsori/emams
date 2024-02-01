import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between flex-wrap p-1">
        <ul className="flex">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard/chart/chartJS"}>ChartJs</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard/chart/d3Chart"}>D3Chart</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard/grid"}>Grid</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard/box"}>Box</Link>
          </li>
          <li className="ml-3">
            <Link href={"/dashboard/test"}>Test</Link>
          </li>
          <li className="ml-3">
            <Link href={"/monitoring/overview"}>Monitoring</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
