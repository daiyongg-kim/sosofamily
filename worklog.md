# Worklog — sosofamily

요청 내역과 결과 기록. 최신 항목이 맨 위. 규칙은 CLAUDE.md "Worklog 규칙" 참조.

## 2026-06-23 — ReceiptZero 세금 영수증 블로그 글 배포
- **요청**: ReceiptZero 블로그 진행(소스는 MarketingTeam, 배포는 여기).
- **결과**: MarketingTeam `build-blog.js` 산출물 반영 — 신규 글 `blog/how-to-organize-receipts-for-taxes-iphone/`("How to Organize Receipts for Taxes on iPhone", target "how to organize receipts for taxes"). 본문 앱링크 `ct=blog-receipt`, 크로스프로모(SnapTip·Scanory·VoiceNote·Qrra)·FAQ·feature 박스 포함. blog/index.html(16글)·sitemap.xml 갱신. 빌드 특성상 전 글 dateModified 갱신되어 기존 글 HTML도 diff. GitHub Pages 자동 배포.

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
