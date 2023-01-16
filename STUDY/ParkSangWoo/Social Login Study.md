### OAuth 2.0
#### Intro
OAuth 2.0은 인증(Authentication)과 권한인가(Authorization)를 위한 업계표준 프로토콜입니다.
OAuth 2.0 프로토콜을 지키는 API를 사용함으로서, 사용자는 민감한 정보(비밀번호)의 노출 없이 사용하고자 하는 서비스에 안전하게 사용자의 정보를 제공하고, 별도의 회원가입 절차 없이 서비스를 이용할 수 있게 됩니다.

#### OAuth2.0의 주요 구성요소
1. Resource Owner (서비스 사용자)
2. Client (사용자가 이용하려는 서비스)
3. Authorization Server (신뢰할 수 있는 플랫폼에서 제공하는 권한인가 서버)
4. Resource Server (신뢰할 수 있는 플랫폼에서 유저의 리소스를 보관하고 있는 서버)

#### OAuth2.0의 흐름
1. Resource Owner가 Client에서 소셜 로그인 버튼을 클릭합니다.
2. Client는 Resource Owner에게 신뢰할 수 있는 플랫폼에 로그인할 수 있는 창을 제공합니다.
3. Resource Owner는 신뢰할 수 있는 플랫폼에 로그인합니다. (Authorization Server)
4. Resource Owner는 Client가 사용하고자하는 Resource를 사용할 수 있도록 사용동의를 합니다. (권한 인가)
5. Client는 Authorization Server로부터 Authorization Code를 받습니다.
6. Client는 Authorization Server에 Authorization Code를 보냅니다.
7. Authorization Server는 Client에 Access Token과 Refresh Token을 보냅니다.
8. Client는 보유하고 있는 Access Token을 이용하여 Resource Server에 필요한 Resource를 요청합니다.
9. Resource Server는 Client가 요청한 Resource를 반환합니다.

#### 주요 서비스별 OAuth2.0 사용법 (Pending)
1. 네이버
2. 카카오
3. 구글
4. 페이스북

#### Sample Code (Pending)

#### Reference Link (Pending)
- [OAuth2 소셜 로그인 가이드](https://deeplify.dev/back-end/spring/oauth2-social-login)
- [OAuth 2.0 Authorization Framework](https://deeplify.dev/back-end/spring/oauth2-social-login)
