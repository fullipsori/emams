"use client";

import Image from "next/image";
import Link from "next/link";

const HeaderNav = () => {
  // const [open, setOpen] = useState(false);
  // const handleSearchBoxClick = () => {
  //   console.log("searchBox를 클릭했습니다.");
  //   setOpen(!open);
  // };

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <div className="brand-wrap" title="EMS Monitoring Application">
              <Link href={"/"} className="brand-img stretched-link">
                <Image src={"/assets/img/user_img/logo.svg"} width={27} height={24} alt="logo" />
              </Link>
              <div className="brand-title">EMMA</div>
            </div>
          </div>
          <div className="header__content">
            <div className="header__content-start">
              <button type="button" className="nav-toggler header__btn btn btn-icon btn-sm btn_menuopen btn_header_w" aria-label="Nav Toggler">
                <Image src={"/assets/img/user_img/i_menuopen.png"} width={14} height={10} alt="Menu Button"/>
                {/* <img alt="Menu Button" loading="lazy" width="14" height="10" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="/assets/img/user_img/i_menuopen.png" /> */}
              </button>
            </div>
            <div className="header__content-end">
              <span className="mr_6 header_name">Admin</span>
              <Link href={"/my/myInfo"}>
                <button className="header__btn btn btn-icon btn-sm" type="button" aria-expanded="true" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title={"myInfo" as string}>
                  <i className="i_h_male" title="사용자 설정"></i>
                </button>
              </Link>
              <button className="header__btn btn btn-icon btn-sm" type="button" aria-expanded="false" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title={"Logout" as string}>
                <i className="i_h_unlock" title="로그아웃"></i>
              </button>
              <div className="d-flex justify-content-center btn_langage_group" style={{ marginBottom: 0 }}>
                {/* <Link href={router.pathname} locale="en">
                  <button 
                    className={
                      lang === "en"
                      ? "btn btn_english active"
                        : "btn btn_english"
                      }
                    type="button"
                    onClick={handleEnClick}
                    >
                    <span className="i_langage i_english mr_3"></span>
                    <span className="langage_name">English</span>
                    </button>
                  </Link> */}

                {/* <Link href={router.pathname} locale="ko">
                  <button
                    className={
                      lang === "ko" ? "btn btn_korean active" : "btn btn_korean"
                    }
                    type="button"
                    onClick={handleKoClick}
                  >
                  <span className="i_langage i_korean mr_3"></span>
                    <span className="langage_name">한국어</span>
                    </button>
                  </Link> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
