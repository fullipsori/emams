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
    if (pathname === "/mlsnList") {
      dispatch(setSelectedRow({ msgVpnName: "" }));
      dispatch(setSelectedQueue({ queueName: "" }));
    }
  }, [pathname, dispatch]);

  console.log(selectedRow?.msgVpnName);
  const activeLink = (url: string, pathname: string) => {
    const findData = url.includes(pathname);

    if (findData) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  }

  const arrActiveLink = (url: string[]) => {

    console.log(url)
    const findData = url.includes(pathname);
    console.log(findData)

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

  const subActiveLink = (url: string, activeUrl: string[], pathname: string) => {
    const findData = activeUrl.includes(pathname);

    if (findData) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  }

  const menuItem = [
    {
      id: 10000,
      // name: '대시보드',
      items: [
        {
          id: 10010,
          name: 'Dashboard',
          activeUrl: ['/dashboard'],
          url: '/dashboard',
          imgUrl: 'sol_i_menu sol_i_dashboard',
          imgAlt: 'DashBoard',
          subItems: []
        },
        {
          id: 10011,
          name: 'Monitoring',
          activeUrl: ['/monitor/overview'],
          url: '/monitor/overview',
          imgUrl: 'sol_i_menu sol_i_dashboard',
          imgAlt: 'Monitoring',
          subItems: []
        },
        {
          id: 10012,
          name: 'Alert Management',
          activeUrl: ['/msg', '/addRule'],
          url: '/msg',
          imgUrl: 'sol_i_menu sol_i_dashboard',
          imgAlt: 'Alert Message',
          subItems: []
        }
      ]
    },
    {
      id: 20000,
      items: [
        {
          id: 20010,
          name: "MLSN",
          activeUrl: ["/mlsnList", "/mlsnm", "/mlsnm/settings", "/channelList", "/channel", "/channel/settings"],
          url: "",
          imgUrl: "sol_i_menu sol_i_msn",
          imgAlt: "Message VPNs",
          subItems: [
            {
              id: 20020,
              name: "Message VPNs",
              activeUrl: ["/mlsnList"],
              url: "/mlsnList"
            },
            // msgVpnName이 ""가 아닐 경우에 메뉴를 보여줌
            ...(selectedRow?.msgVpnName !== ""
              ? [
                {
                  id: 20021,
                  name: "Message VPN",
                  activeUrl: ["/mlsnm", "/mlsnm/settings"],
                  url: "/mlsnm"
                },
                {
                  id: 20022,
                  name: "Queues",
                  activeUrl: ["/channelList", "/channel", "/channel/settings"],
                  url: "/channelList"
                },
              ]
              : []),
          ],
        },
      ],
    },
  ];

  return (
    <>
      {menuItem.map((item: any, idx: number) => (
        <>
          <div className="mainnav__categoriy" key={item.id}>
            <ul className="mainnav__menu nav flex-column">
              {item.items.map((subItem: any) =>
                subItem.subItems.length === 0 ? (
                  <li className="nav-item has-sub" key={subItem.id}>
                    <Link
                      href={subItem.url}
                      className={activeLink(subItem.url, pathname)}
                    >
                      <span className={subItem.imgUrl}></span>
                      <span className="nav-label sol_ml_6">{subItem.name}</span>
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item has-sub" key={subItem.id}>
                    <Link
                      href={subItem.activeUrl[0]}
                      className={arrActiveLink(subItem.activeUrl)}
                    >
                      <span className={subItem.imgUrl} />
                      <span className="nav-label sol_ml_6">{subItem.name}</span>
                    </Link>

                    <ul className={ulShowLink(subItem.activeUrl)}>
                      {subItem.subItems.map((sub: any) => (
                        <li className="nav-item" key={sub.id}>
                          <Link
                            href={sub.url}
                            className={subActiveLink(sub.url, sub.activeUrl, pathname)}
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
