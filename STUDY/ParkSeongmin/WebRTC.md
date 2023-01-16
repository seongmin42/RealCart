
## WEB RTC (Web RealTime Communication)
>  웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술

크게 3가지 크래스에 의해 실시간 데이터 교환이 일어난다.
- MediaStream : 카메라/마이크 등 데이터 스트림 접근
- RTCPeerConnection : 암호화 및 대역폭 관리 및 오디오 또는 비디오 연결
- RTCDataChannel : 일반적인 데이터 P2P 통신

- Signaling : RTCPeerConnection들이 적절하게 데이털르 교환할 수 있게 처리하는 과정

caller와 callee가 중간 역할 서버를 통해 SessionDescription을 주고 받는다.

### 용어 정리

- Stun Server, Turn Server
  : 네트워크 보안 장치들(방화벽 등)을 극복하고 P2P 통신을 가능하게 해주는 것
- SDP(Session Description Protocol)
  : 스트리밍 미디어의 초기화 인수를 기술하기 위한 포맷
- ICE(Interactive Connectivity Establishment)
  : NAT 환경에서 자신의 Public IP를 파악하고 상대방에게 데이터를 전송하기 위한 Peer간의 응답 프로토콜


#### 출처
---------------------------
- https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API
- https://velog.io/@ehdrms2034/WebRTC-%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%A1%9C-%ED%99%94%EC%83%81-%EC%B1%84%ED%8C%85%EC%9D%84-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0
- https://alnova2.tistory.com/1110
