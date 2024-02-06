"use client"

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function Layout(props: { tabs: ReactNode }) {
  const [index, setIndex] = useState(0);

  const router = useRouter();

  const activeLink = (id: number) =>
    id === index ? "nav-link active" : "nav-link";

  const data = [
    { id: 0, title: 'Summary', contentUrl: '/channel' },
    { id: 1, title: 'Setting', contentUrl: '/channel/settings' },
  ];

  const fnMovePage = (url: string, id: number) => {
    console.log(url)
    setIndex(id);
    router.push(url);
  }

  return (
    <>
      <div className="sol_breadcrumb_area">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">edpVPN02</li>
            <li className="breadcrumb-item active" aria-current="page">Queues</li>
          </ol>
        </nav>
      </div>

      <div className="tab-base">
        <ul className="nav nav-callout" role="tablist">
          {data.map((item) => (
            <li className="nav-item" role="presentation" key={item.id}>
              <button
                className={activeLink(item.id)}
                data-bs-toggle="tab"
                data-bs-target="#tabsHome"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                onClick={() => fnMovePage(item.contentUrl, item.id)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        {data
          .filter((item) => index === item.id)
          .map((item) => (
            <div className="tab-content" key={item.id}>
              {props.tabs}
            </div>
          ))}
      </div>
    </>
  );
}