"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hook/hook";
import { setSelectedQueue, setSelectedRow } from "@/redux/vpnSlice";
import { useEffect } from "react";

const NavItem = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);

  // 특정 url 에서 redux에 저장된 msgVpnName을 null로 저장
  useEffect(() => {
    if (pathname === "/mlsnmList") {
      dispatch(setSelectedRow({ msgVpnName: "" }));
      dispatch(setSelectedQueue({ queueName: "" }));
    }
  }, [pathname, dispatch]);

  console.log(selectedRow?.msgVpnName);
  const activeLink = (url: string, activeUrl: string[], pathname: string) => {

    const findData = activeUrl.includes(pathname);

    if (findData) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
    // pathname === url ? "nav-link active" : "nav-link";
  }

  const arrActiveLink = (url: string[]) => {
    const findData = url.includes(pathname);

    if (findData) {
      return "mininav-toggle nav-link active";
    } else {
      return "mininav-toggle nav-link collapsed";
    }
  };

  const ulShowLink = (url: string[]) => {
    const findData = url.includes(pathname);

    if (findData) {
      return "mininav-content nav show collapse";
    } else {
      return "mininav-content nav collapse";
    }
  };

  const menuItem = [
    {
      id: 10000,
      // name: '대시보드',
      items: [
        {
          id: 10001,
          name: '대시보드',
          activeUrl: ['/dashboard'],
          url: '/dashboard',
          imgUrl: 'i_menu i_m_dashboard',
          imgAlt: 'DashBoard',
          subItems: []
        },
        {
          id: 10002,
          name: 'Monitoring',
          activeUrl: ['/monitor/overview'],
          url: '/monitor/overview',
          imgUrl: 'i_menu i_m_dashboard',
          imgAlt: 'Monitoring',
          subItems: []
        }
      ]
    },
    {
      id: 20000,
      name: "MLSN",
      items: [
        {
          id: 20001,
          name: "Message VPNs",
          activeUrl: ["/mlsnmList"],
          url: "/mlsnmList",
          imgUrl: "i_menu i_m_durable",
          imgAlt: "Message VPNs",
          subItems: [],
        },
                // msgVpnName이 ""가 아닐 경우에 메뉴를 보여줌
                ...(selectedRow?.msgVpnName !== ""
                ? [
        {
          id: 20002,
          name: "Message VPN",
          activeUrl: ["/mlsnm", "/mlsnm/settings"],
          url: "/mlsnm",
          imgUrl: "i_menu i_m_durable",
          imgAlt: "Message VPN",
          subItems: [],
        },
        {
          id: 20003,
          name: "Queues",
          activeUrl: ["/channelList", "/channel", "/channel/settings"],
          url: "/channelList",
          imgUrl: "i_menu i_m_durable",
          imgAlt: "Queues",
          subItems: [],
        },
      ]
      : []),
      ],
    },
  ];

  return (
    <>
      {menuItem.map((item: any, idx: number) => (
        <>
          <div className="mainnav__categoriy" key={item.id}>
            <h6 className="px-3 mt-0 mainnav__caption fw-bold">{item.name}</h6>
            <ul className="mainnav__menu nav flex-column">
              {item.items.map((subItem: any) =>
                subItem.subItems.length === 0 ? (
                  <li className="nav-item has-sub" key={subItem.id}>
                    <Link
                      href={subItem.url}
                      className={activeLink(subItem.url, subItem.activeUrl, pathname)}
                    >
                      <span className={subItem.imgUrl}></span>
                      <span className="nav-label ml_10">{subItem.name}</span>
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item has-sub" key={subItem.id}>
                    <Link
                      href={subItem.activeUrl[0]}
                      className={arrActiveLink(subItem.activeUrl)}
                    >
                      <span className={subItem.imgUrl} />
                      <span className="nav-label ml_10">{subItem.name}</span>
                    </Link>
                    <ul className={ulShowLink(subItem.activeUrl)}>
                      {subItem.subItems.map((sub: any) => (
                        <li className="nav-item" key={sub.id}>
                          <Link
                            href={sub.url}
                            className={activeLink(sub.url, sub.activeUrl, pathname)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ))}
    </>
  );
};
export default NavItem;
