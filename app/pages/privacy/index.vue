<template>
  <div>
    <h1>개인정보처리방침</h1>
    <el-divider />
    <p>('www.zerocho.com'이하 'ZeroCho Blog')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.</p>
    <p>('ZeroCho Blog') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</p>
    <p>○ 본 방침은부터 2017년 1월 1일부터 시행됩니다.</p>
    <h1>1. 개인정보의 처리 목적</h1>
    <p>('www.zerocho.com'이하 'ZeroCho Blog')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.</p>
    <h5>가. 홈페이지 회원가입 및 관리</h5>
    <p>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.</p>
    <h5>나. 재화 또는 서비스 제공</h5>
    <p>콘텐츠 제공 등을 목적으로 개인정보를 처리합니다.</p>
    <h4>2. 개인정보 파일 현황</h4>
    <ul>
      <li>1. 개인정보 파일명 : 개인정보처리방침</li>
      <li>- 개인정보 항목 : 이메일, 비밀번호 질문과 답, 비밀번호, 성별, 서비스 이용 기록, 접속 로그, 쿠키</li>
      <li>- 수집방법 : 홈페이지</li>
      <li>- 보유근거 : 정보주체의 동의</li>
      <li>- 보유기간 : 영구</li>
    </ul>
    <h4>3. 개인정보처리 위탁</h4>
    <p>① ('ZeroCho Blog')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
    <p>② ('www.zerocho.com'이하 'ZeroCho Blog')은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
    <p>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
    <h4>4. 정보주체의 권리,의무 및 그 행사방법</h4>
    <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
  </div>
</template>

<script>
export default {
  head: _ => ({
    title: '개인정보처리방침 | Kidolog'
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

div {
  h1 {
    font-weight: bold;
    font-size: 34px;
    color: $oc-gray-9;
  }
  h4 {
    font-size: 26px;
    font-weight: 500;
    color: $oc-gray-8;
    margin: 30px 0;
    &:after {
      content: '';
      width: 45px;
      height: 2px;
      background: $brand-color;
      margin-top: 16px;
      z-index: 10;
      display: block;
    }
  }
  h5 {
    font-size: 22px;
    font-weight: 500;
    color: $brand-color;
    margin: 30px 15px 20px;
  }
  p {
    font-size: 16px;
    color: $oc-gray-8;
    line-height: 160%;
    word-break: keep-all;
    margin: 0 15px;
  }
  ul {
    li {
      position: relative;
      color: $oc-gray-7;
      line-height: 160%;
      font-size: 16px;
      font-weight: 300;
    }
  }
}
</style>
