## 2026-09-07 — Hordeling 개인정보 처리방침 추가

- **요청**: 게임 App Store 제출에 필요한 개인정보 URL
- **결과**: `apps/hordeling/legal/privacy-policy.html` 신규. Qrra 문서를 틀로만 쓰고 내용은 새로 썼다 — 게임은 카메라·사진·위치·연락처를 전혀 쓰지 않아 유틸 앱 문구를 복사하면 사실과 어긋난다. 실제로 밖으로 나가는 건 AdMob SDK 수집분과 애플 결제 검증뿐이고 우리 서버는 없다는 점을 명시.

## 2026-09-07 — Milesheet 개인정보처리방침 페이지 추가

- **요청**: Milesheet 제출 마무리 중, 앱과 스토어가 가리키는 개인정보처리방침 URL이 **404**로 확인됨.
- **결과**: `apps/milesheet/legal/privacy-policy.html` 신규 작성·배포(200 확인).
  ReceiptZero 것을 복사하지 않았다 — 그 문서는 "We do not track your location"이라고 명시하는데
  Milesheet는 **Always 위치 + 모션 활동**을 쓰므로 그대로 두면 허위 기술이 된다.
  위치에 별도 섹션을 두어 ①무엇을 저장하는지 ②왜 백그라운드 권한이 필요한지(운행 누락은 건수 문제가
  아니라 **사업 사용 비율**을 움직이고, 그 비율이 모든 차량 경비에 곱해진다) ③외부 전송이 없다는 점
  ④거부해도 앱을 계속 쓸 수 있다는 점을 적었다. 커밋 `d01abe3`.

## 2026-09-07 — EmailJS Gmail 연결 복구 + 월간 heartbeat 워크플로

- **요청**: EmailJS "service_7y4umo7 stopped working" 경고 원인 확인 → 복구 → "일주일/한달에 한번 자동으로 이메일 보내서 안죽게" + jcafterschool.ca도 함께.
- **결과**:
  - 원인: Contact 폼(EmailJS Gmail, sosofamily.ca@gmail.com)의 OAuth 토큰이 6개월 미사용으로 만료(`412 Invalid grant`). 1/16 마지막 성공 → 8/18 첫 실패 → 9/6 2건 실패(Roger Waugh, ReceiptZero 날짜 형식 문의 — 본인이 3분 뒤 직접 메일 보내 답변 완료). 대시보드에서 Gmail 재연결(동의 화면 "Send email on your behalf" 체크 필수) 후 test 200 OK.
  - `.github/workflows/emailjs-heartbeat.yml` 신규: 매월 1일 15:17 UTC + 수동 실행. sosofamily.ca·jcafterschool.ca 두 EmailJS 계정에 "[TEST EMAIL]" 1통씩 REST API로 발송, 실패 시 job 실패 → GitHub 알림. secrets `EMAILJS_PRIVATE_KEY`, `EMAILJS_PRIVATE_KEY_JC`. 각 EmailJS 계정 Security에서 non-browser API + Private Key ON 필요.
  - 검증: 수동 실행 run 34157606966 양쪽 200 OK (c12b38d).

## 2026-08-18 — Scanory · Qrra Google Play 링크 추가

- **요청**: Scanory·Qrra 안드로이드 앱을 sosofamily.ca에 업데이트.
- **결과**: `index.html` 앱 카드 2곳에 `store-btn--play` 버튼 추가.
  SnapTip(c2a1e23)에서 세운 멀티 스토어 패턴을 그대로 따름 —
  `?id=<패키지>&referrer=utm_source%3Dsosofamily%26utm_medium%3Dweb`
  (Play는 애플의 `ct`가 아니라 install referrer로 귀속되므로 UTM을 referrer에 인코딩해 전달).
  JSON-LD의 `operatingSystem`도 `iOS` → `iOS, Android`로 갱신.
  링크 2개 모두 HTTP 200 확인. 개별 앱 페이지는 `apps/{qrra,scanory}/legal/`만 있어 대상 아님.
- **비고**: 이제 Play 링크 보유 앱은 SnapTip·Qrra·Scanory 3종.

# Worklog — sosofamily

요청 내역과 결과 기록. 최신 항목이 맨 위. 규칙은 CLAUDE.md "Worklog 규칙" 참조.

## 2026-06-23 — ReceiptZero 세금 영수증 블로그 글 배포
- **요청**: ReceiptZero 블로그 진행(소스는 MarketingTeam, 배포는 여기).
- **결과**: MarketingTeam `build-blog.js` 산출물 반영 — 신규 글 `blog/how-to-organize-receipts-for-taxes-iphone/`("How to Organize Receipts for Taxes on iPhone", target "how to organize receipts for taxes"). 본문 앱링크 `ct=blog-receipt`, 크로스프로모(SnapTip·Scanory·VoiceNote·Qrra)·FAQ·feature 박스 포함. App Store 스크린샷 3장(`assets/blog/receiptzero/` Dashboard·Triage·Export) 본문 삽입. blog/index.html(16글)·sitemap.xml 갱신. 빌드 특성상 전 글 dateModified 갱신되어 기존 글 HTML도 diff. GitHub Pages 자동 배포.

## 2026-06-23 — Our Apps에 ReceiptZero 추가
- **요청**: App Store Connect에 새 앱(id 6777239776) 추가했으니 웹사이트에도 추가.
- **결과**: 앱 = ReceiptZero: Receipt Scanner (Finance). index.html "Our Apps" 그리드에 Scanory 다음 카드 추가 + JSON-LD SoftwareApplication 항목 추가(FinanceApplication, 무료, url https://apps.apple.com/app/id6777239776). 아이콘 `assets/app-icons/receiptzero.png`(iTunes lookup 512px) 다운로드.

## 2026-06-21 — 블로그 글 빌드: "What to Eat Today" (whattoeat.day)
- **요청**: 블로그에 whattoeat.day 소개 글(캡처 포함).
- **결과**: `blog/what-to-eat-today-free-recipe-website/` 신규 생성(소스는 MarketingTeam content/blog). 캡처 3장 `assets/blog/whattoeat/`. 빌드로 전 글 dateModified·blog/index·sitemap 갱신됨(정상 동작). 로컬 렌더 검증 완료.

## 2026-06-21 — Family Sites에 whattoeat.day 추가
- **요청**: sosofamily.ca에 패밀리 사이트로 whattoeat.day 추가.
- **결과**: index.html "Family Sites" 목록(The Daily Utils 옆)에 `What to Eat Today` 링크 추가 — `https://whattoeat.day/?utm_source=sosofamily&utm_medium=cross-promo&utm_campaign=footer` (사이트간 크로스프로모 UTM 규약 적용). 앱 JSON-LD(iOS 앱 전용)엔 미추가 — 웹 속성이라 thedailyutils와 동일하게 링크 목록에만.

## 2026-06-21 — Worklog 규칙 도입
- **요청**: 요청 내용과 결과를 모든 프로젝트의 CLAUDE.md/worklog.md에 기록. CLAUDE.md엔 인스트럭션, worklog.md엔 명령+결과.
- **결과**: CLAUDE.md 신규 생성 + "Worklog 규칙" 섹션 추가, worklog.md 신규 생성(이 항목).
