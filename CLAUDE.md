# sosofamily.ca — Project

SoSo Family iOS 앱 패밀리 + 무료 웹 유틸리티의 마케팅/블로그 사이트 (GitHub Pages).
블로그 소스는 MarketingTeam repo의 `content/blog/*.md` → `build-blog.js`로 이 repo에 출력. 비블로그 페이지는 이 repo 직접 편집.

## 작업 전 동기화 규칙 (2026-06-21 입고)

이 repo의 **코드/콘텐츠를 수정하기 전에 반드시 최신화**한다:
- 작업 시작 시 `git pull --rebase origin main`.
- 이유: 원격이 자동배포/자동커밋(GitHub Pages·Vercel·구글리뷰 자동갱신 등)으로 앞서 있을 수 있어, 먼저 당기지 않으면 push가 non-fast-forward로 거부됨.
- 충돌 시 rebase로 우리 변경을 원격 위에 올린다.

## Worklog 규칙 (2026-06-21 입고)

사용자가 작업을 요청하면, **이 repo를 실제로 건드린 경우에 한해** 기록을 남긴다:
- **worklog.md** (repo 루트): 요청 내용과 결과를 1건씩 누적, 최신 항목 맨 위. 형식:
  ```
  ## YYYY-MM-DD — <한 줄 제목>
  - **요청**: <사용자 요청 원문/요지>
  - **결과**: <수행한 일과 산출물(파일/커밋 등)>
  ```
- **CLAUDE.md**: 로그는 넣지 않는다. 이 규칙(인스트럭션)만 유지. 오래 가는 결정/구조 변경 시에만 해당 섹션 갱신.
- worklog.md가 없으면 새로 만든다.
