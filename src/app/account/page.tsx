'use client'
import PageTitle from '@/components/atom/PageTitle'
import { Button } from '@yeonsubaek/yeonsui'

function page() {
  return (
    <div className="account">
      <PageTitle>회원정보</PageTitle>
      <dl className="account-list">
        <div className="account-item">
          <dt className="account-title">이메일</dt>
          <dd className="account-detail">1234@gmail.com</dd>
        </div>
        <div className="account-item">
          <dt className="account-title">닉네임</dt>
          <dd className="account-detail">이름</dd>
        </div>
      </dl>
      <div className="account-button">
        <Button>수정</Button>
      </div>
      <div className="account-etc-buttons">
        <Button variant="link" color="text">
          로그아웃
        </Button>
        <Button variant="link" color="error">
          회원탈퇴
        </Button>
      </div>
    </div>
  )
}

export default page
