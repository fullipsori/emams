"use client";

import Image from "next/image";
import Link from "next/link";

const HeaderNav = () => {

  return (
    <>
      <header className="header">
        <div className="header__inner">
					<div className="sol_header_menuopen">
						<button type="button" className="nav-toggler header__btn btn btn-icon btn-sm">
							<i className="sol_i_menuopen"></i>
						</button>
					</div>	

					<div className="header__brand">
						<div className="brand-title">ACell EMMA</div>						
						<div className="brand-wrap" title="EMAMS">
						  <a className="brand-img stretched-link" href="/">
                <Image src={"/assets/img/solace_img/bi_img.png"} width={19} height={17} alt="logo" />
						  </a>
						</div>		
					</div>

					<div className="header__content row">
						<div className="header__content-end d-flex justify-content-end">
							<div className="sol_header_menu">
								<button className="header__btn btn btn-icon btn-sm">
									<i className="sol_i_message"></i>
								</button>
								<button className="header__btn btn btn-icon btn-sm">
									<i className="sol_i_alrm"></i>
								</button>
								<button className="header__btn btn btn-icon btn-sm sol_r_6">
									<i className="sol_i_sound"></i>
								</button>							
							</div>

							<div className="d-flex flex-wrap gap-2">
								<div className="btn-group">
									<button className="btn btn-sm hstack sol_btn_language" data-bs-toggle="dropdown">
										<i className="sol_i_global sol_r_6"></i>English
									</button>
									<ul className="dropdown-menu">
										<li><a className="dropdown-item">Korean</a></li>
										<li><a className="dropdown-item">China</a></li>
									</ul>
								</div>
								
								<div className="btn-group">
									<a className="btn btn-sm hstack sol_btn_language" data-bs-toggle="dropdown">
										gogs76
									</a>
									<ul className="dropdown-menu">
										<li><a className="dropdown-item">Help</a></li>
										<li><a className="dropdown-item">Account</a></li>
										<li><a className="dropdown-item">Setting</a></li>
										<li><a className="dropdown-item"><i className="sol_i_logout sol_r_6"></i>Logout</a></li>
									</ul>
								</div>																		
							</div>
						</div>
					</div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
