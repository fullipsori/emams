'use client';
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <title>404</title>
      <div className="content__boxed rounded-0 w-100 min-vh-100 d-flex flex-column align-items-stretch justify-content-center">
        <div className="content__wrap">
          <div className="text-center">
            <div className="mb-3 error-code page-title">404</div>
            <h3 className="mb-4">
              <div className="badge bg-info">페이지를 찾을 수 없습니다.</div>
            </h3>
            <p className="lead">페이지가 존재하지 않거나 삭제되었을 수 있습니다. 관리자에게 문의하여 주시기 바랍니다.</p>
          </div>

          <div className="gap-3 mt-4 d-flex justify-content-center">
            <button type="button" onClick={() => window.history.back()} className="btn btn-light" >돌아가기</button>
            <Link href="/" className="btn btn-primary">홈으로</Link>
          </div>
        </div>
      </div>
    </>
  );
}
