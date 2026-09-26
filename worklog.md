# worklog

## 2026-09-25 — App Store 링크에 provider token(pt) + Qrra 글 정정 반영

- **요청**: Qrra 성장 계획 검토 후 "모두 하자"
- **결과**: 홈 9·랜딩(scanory·fitnesslog·qrra·milesheet) App Store 링크를 `?pt=128397788&ct=…&mt=8`로(JSON-LD url 제외). 블로그 재빌드 — 전 글 CTA·푸터 pt 반영, Qrra 관련 글의 색상·로고·무제한·수정 가능 주장 삭제(MarketingTeam 소스)

## 2026-09-25 — Qrra 전용 랜딩 `/apps/qrra/` 신설

- **요청**: Qrra 다운로드 성장 계획 검토 후 "모두 하자" — `/apps/qrra/`가 404라 웹에서 보낼 곳이 없었음
- **결과**: `apps/qrra/index.html`(Scanory 랜딩과 같은 구조), `assets/apps/qrra/{create,history,detail}.{webp,jpg}`(Qrra repo `screenshots/raw` 실제 화면, 477×1038), 홈 Qrra 카드에 Learn more, sitemap 추가
  - 기능은 소스로 확인한 것만: 스캔(QR + EAN·UPC·Code 128/39/93·Codabar·ITF·Data Matrix·PDF417·Aztec, iPhone은 사진에서도), 생성 13종(전화·URL·이메일·SMS·연락처·텍스트·Wi‑Fi·앱스토어 링크·Facebook·Instagram·X·WhatsApp·YouTube, iOS·Android 동일), 기록·검색·즐겨찾기, 공유·이미지 저장, PDF 내보내기(iPhone). **색상·로고 꾸미기는 언급 안 함**(기능 없음)
  - 과금: iPhone은 처음 5회(스캔·생성 합산, 평생)는 광고 없음 → 이후 2회마다 전면 광고(`AdManager.shouldShowAd`), 1회성 Remove Ads. ⚠️ iOS `SubscriptionManager`의 하루 5회 한도·보상형 페이월은 **정의만 있고 호출되지 않음** → 랜딩에 쓰지 않음. Android는 하루 한도(3 + 보너스)가 연결돼 있어 정책이 다름 → "Ad-supported"만 표기
  - 요구 사양: iOS 17.0+, Android 8.0+(minSdk 26), Android 앱은 영어 UI
  - 기대 관리: 정적 QR은 인쇄 후 수정·스캔 통계 불가
  - CTA: `ct=web-qrra-landing`(pt는 상위 작업에서 일괄 추가 예정), Play referrer `utm_medium=landing`, TDU 생성기 UTM 크로스프로모
- **검증**: 로컬 200(페이지·에셋·legal·관련 글 2편·sitemap), 390/768/1440px scrollWidth = 뷰포트(랜딩·홈)

## 2026-09-24 — 모바일 헤더 정리 + Scanory·FitnessLog 전용 랜딩 (마케팅 진단 B01)

- **요청**: 마케팅 인계 계획 P1 B01 ("모두 한방에 가자")
- **결과**:
  - 헤더: 390px에서 로고와 메뉴가 줄바꿈되던 문제 → `.nav` flex, `white-space:nowrap`, ≤480px에서 패딩·글자 축소와 "Family" 링크 숨김(`nav-link--secondary`, 섹션은 그대로). 블로그 헤더(3링크)에도 같이 적용
  - `/apps/scanory/`, `/apps/fitnesslog/` 신규: 대상 사용자, 작업 흐름, 무료/유료 조건표, 실제 화면, 관련 글, CTA
    - Scanory 조건: 무료·워터마크/페이지 제한 없음·배너 광고·IAP 없음·기기 저장·**iOS 26.2+**(현 스토어 기준)·Play 있음. 기능(가장자리 인식, 다중 페이지, A4/B5, 폴더·이름 변경·검색·공유)은 앱 소스에서 확인
    - FitnessLog 조건: 무료·계정 불필요(동기화용 로그인은 선택)·배너+전면 광고·Profile 탭의 1회 Remove Ads·구독 없음·iOS 17.0+. 129개 운동·루틴·캘린더·월간 통계는 현 스토어 설명 기준
    - 스크린샷: Scanory는 en-US 스토어 컷(2026-08-15), FitnessLog는 현재 스토어와 같은 시뮬레이터 컷 중 기능 화면 3장(로그인 화면과 "Video Guides" 문구 컷은 제외). 480px webp+jpg, 합계 256KB
    - CTA ct: `web-scanory-landing`, `web-fitnesslog-landing`. Play referrer `utm_source=sosofamily&utm_medium=landing`. canonical/JSON-LD에는 ct 없음
  - 홈 카드 Scanory·FitnessLog·Milesheet에 "Learn more" 링크 추가(기존 스토어 버튼·ct 유지), sitemap에 2개 URL 추가
- **검증**: 로컬 http.server — 두 페이지 200, 내부 링크·이미지 전부 200, iframe 측정으로 `/`·두 랜딩 모두 390/768/1440px에서 scrollWidth = 뷰포트, 390px 헤더 nav 한 줄(34px)

## 2026-09-24 — 홍보 문구를 실제 제품 조건에 맞춤 (마케팅 진단 A01·A05)

- **요청**: 인계 계획 P0 "모두 한방에"
- **근거(2026-09-24 실측)**: iTunes lookup(CA) 최소 OS·연령 + ASC API IAP/구독 + 앱 소스 AdMob 설정
- **홈페이지**: "Six small tools… All free, no subscriptions" → 도구 7개+게임 2개, "무료 다운로드, 일부 광고·선택 구매, 카드에 표기"로 수정. meta/twitter description의 "All free" 제거
  - 9개 카드에 💳 과금 표기 추가(광고 / 1회 Remove Ads / ReceiptZero Pro 연간·평생 / Milesheet 유료 내보내기 / Hordeling Supporter Pack)
  - 최소 OS: Scanory 16.0+ → **26.2+**(현 스토어 기준, 17.0 하향은 새 버전 승인 후), ReceiptZero·Milesheet 16.0+ → 17.0+
  - Arrowly 설명에 11레벨부터 하트 3개·소진 시 재시작 반영
  - JSON-LD `url`·App Store ct 링크는 변경 없음
- **Milesheet 랜딩**: "will do"→현재형, "Price, before you give us your email"→"Price", "logbook is what we're adding" 삭제, CTA의 "no subscription" 삭제, 자동 감지가 연간+평생 플랜 포함(코드 `Entitlements.swift` 확인)으로 정정, CRA 73¢/67¢에 "provinces"(준주 77¢/71¢) 범위 명시(Finance Canada 2026-01 발표)
- **블로그**: MarketingTeam 소스 수정 후 재빌드(5-apps 글의 "No Ads"/"no in-app purchases"/iOS 16, workout 글 "no ads", receipt 글 "completely free", 푸터 "All free")

## 2026-09-21 — Milesheet 반영 (라이브인데 사이트가 "아직 안 나왔다"고 말하고 있었다)

- **요청**: "milesheet 도 있는데?"
- 🔴 **랜딩 페이지가 대기자 명단이었다.** `/apps/milesheet/` 에 *"It isn't built yet. We're finding out whether enough drivers want this…"* 라고 적혀 있었는데, **앱은 2026-09-07 에 출시돼 `READY_FOR_SALE` 이고 App Store 에서 받을 수 있다.** 수요 검증용 페이지가 출시 후에도 그대로 남아, 받을 수 있는 앱을 못 받는다고 말하고 있었다. App Store CTA 로 교체하고 EmailJS 폼·스크립트를 걷어냈다(폼이 사라지면 스크립트가 없는 요소를 참조한다).
- **홈페이지 카드 추가** — 앱 9개. JSON-LD 도 9개. 아이콘 생성. `ct=web-milesheet`.
- 🔴 **데이터 수집에서 빠져 있었다.** `.credentials/asc-config.json` 의 앱 목록에 Milesheet 이 없어서 **설치·매출이 전혀 안 잡히고 있었다.** 2026-08-14 에 ReceiptZero 가 같은 이유로 누락됐던 것과 같은 부류다. 추가함.
- 🔴 **제출 전 점검에서도 빠져 있었다.** `check-store-declarations.py` 의 `SRC` 매핑에 Milesheet·Hordeling·Arrowly 셋 다 없었다 — 광고 신고 대조가 한 번도 안 돌았다는 뜻. 셋 다 추가하고 재실행: 전부 일치(Milesheet 은 광고 없음/`false`).
- **교훈**: 새 앱을 내면 **세 곳을 같이 갱신해야 한다** — 홈페이지 카드, `asc-config.json`, `check-store-declarations.py` 의 `SRC`. 셋 다 조용히 실패한다(데이터가 0으로 보이거나 점검이 그 앱을 건너뛴다).

## 2026-09-21 — 홈페이지에 게임 2종 추가 + 전 App Store 링크에 ct 토큰

- **요청**: "지금 있는 앱들 기반으로 sosofamily.ca 업데이트 하자."
- **빠져 있던 것**: Hordeling·Arrowly가 **둘 다 라이브인데 홈페이지에 없었다.** 앱 카드 2개와 JSON-LD 항목 2개를 추가(총 8개). 아이콘은 각 repo의 `icon-1024.png` 에서 160px png/webp 로 생성.
- 🔴 **`ct=` 토큰이 하나도 없었다.** 규약(CLAUDE.md)은 모든 `apps.apple.com` 링크에 `?ct=` 를 요구하는데 홈페이지 링크 6개 전부 없었다. **사이트가 만들어낸 설치를 측정할 방법이 없던 것.** 8개 전부 `ct=web-<앱>` 부여.
  - JSON-LD 의 `"url"` 은 **일부러 제외** — 구조화 데이터는 정규 URL이어야 하고 추적 파라미터를 넣으면 안 된다.
- 히어로 문구가 "Six small tools" 로 고정돼 있어 게임을 반영해 수정.
- 게임 설명은 **1.0 기준**으로 적었다. Arrowly 1.1(하트·별점)은 아직 심사 중이라 "no timer, no lives to wait on" 이 라이브 버전과 맞다 — 1.1 승인되면 문구를 고쳐야 한다.
- 검증: 카드 8개·아이콘 로드(160px)·ct 토큰 8종·JSON-LD 2블록 파싱 통과, 브라우저 육안 확인.
## 2026-09-08 — Milesheet 대기자 폼을 sosofamily EmailJS 서비스로 복귀

- **요청**: "오늘 보낼껀 없어?" 점검 중 발견.
- **결과**: `apps/milesheet/index.html`의 EmailJS 설정이 **JC After School 계정**(service_ejg4a6t/template_ptm8jye/JC publicKey)을 가리키고 있었다 — 9/7 당시 sosofamily Gmail 연결이 만료돼 우회한 흔적. 주석은 "SoSo Family 서비스 공유"라고 적혀 있어 실제와 달랐음. sosofamily 서비스(service_7y4umo7/template_9eyeky4)로 되돌리고 템플릿 변수도 Contact 폼과 같은 from_name/from_email/subject/message/to_email 로 맞춤(c025a8e). 검증은 사용자가 대기자 폼 1회 제출 → sosofamily.ca@gmail.com 수신 확인 필요. 그 전에 JC 계정 Email History에 이미 들어온 대기자 신청이 있는지 확인할 것.

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
